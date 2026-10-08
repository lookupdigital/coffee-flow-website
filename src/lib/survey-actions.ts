"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { findSurvey, SURVEY_COMMENTS_MAX } from "@/lib/surveys";
import { clientIp } from "@/lookup/leads/protection";
import { createServiceClient } from "@/lookup/supabase/service";

export type SurveySubmissionResult = { ok: true } | { ok: false; message: string };

const UNIQUE_VIOLATION = "23505";
// A whole office often shares one public IP, so the limit is per IP but generous.
const RATE_LIMIT = { maxSubmissions: 40, windowSeconds: 600 };

const rating = z.coerce.number().int().min(1).max(5);
const schema = z.object({
  survey: z.string().max(40),
  coffee_taste: rating,
  machine_experience: rating,
  comments: z.string().trim().max(SURVEY_COMMENTS_MAX).optional(),
  submission_id: z.uuid(),
});

const MESSAGES = {
  missingRating: "נא לבחור דירוג לכל אחת מהשאלות.",
  rateLimited: "נשלחו יותר מדי תשובות בזמן קצר. נסו שוב בעוד כמה דקות.",
  server: "לא הצלחנו לשמור את התשובה. נסו שוב בעוד רגע.",
};

async function allowedByRateLimit(ip: string): Promise<boolean> {
  const secret = process.env.LEAD_RATE_LIMIT_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) return true;
  const bucket = `survey:${createHmac("sha256", secret).update(ip).digest("base64url").slice(0, 32)}`;
  try {
    const { data, error } = await createServiceClient().rpc("lead_rate_limit_consume", {
      p_bucket: bucket,
      p_limit: RATE_LIMIT.maxSubmissions,
      p_window_seconds: RATE_LIMIT.windowSeconds,
    });
    // An unavailable limiter never blocks a real answer.
    return error ? true : data === true;
  } catch {
    return true;
  }
}

/** Stores one anonymous survey answer. Honeypot → validation → rate limit → insert. Logs never include answers. */
export async function submitSurvey(formData: FormData): Promise<SurveySubmissionResult> {
  const input: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") input[key] = value;
  }
  // Honeypot: the hidden field is empty for real visitors.
  if (input.company_website) return { ok: true };

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? "");
    return { ok: false, message: field === "comments" ? MESSAGES.server : MESSAGES.missingRating };
  }
  const survey = findSurvey(parsed.data.survey);
  if (!survey) return { ok: false, message: MESSAGES.server };

  if (!(await allowedByRateLimit(clientIp(await headers())))) return { ok: false, message: MESSAGES.rateLimited };

  try {
    const { error } = await createServiceClient()
      .from("survey_responses")
      .insert({
        survey: survey.slug,
        coffee_taste: parsed.data.coffee_taste,
        machine_experience: parsed.data.machine_experience,
        comments: parsed.data.comments || null,
        submission_id: parsed.data.submission_id,
      });
    // A duplicate submission_id means this exact answer was already stored (a retried request).
    if (error && error.code !== UNIQUE_VIOLATION) {
      console.error("[survey] insert failed:", error.code, error.message);
      return { ok: false, message: MESSAGES.server };
    }
  } catch (error) {
    console.error("[survey] insert failed:", (error as Error).message);
    return { ok: false, message: MESSAGES.server };
  }
  return { ok: true };
}
