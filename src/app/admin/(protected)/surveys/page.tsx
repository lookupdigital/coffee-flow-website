import type { Metadata } from "next";
import { Card, formatDateTime, Notice, PageHeader } from "@/lookup/admin/ui";
import { requireAdmin } from "@/lookup/auth";
import { surveyQuestions, surveys } from "@/lib/surveys";

export const metadata: Metadata = { title: "שאלונים" };

const PAGE_SIZE = 200;
const average = (values: number[]) => (values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : "—");

/** Coffee Flow: answers to the QR-code satisfaction surveys (src/lib/surveys.ts), newest first. */
export default async function SurveysPage() {
  const { supabase } = await requireAdmin();
  const { data, error, count } = await supabase
    .from("survey_responses")
    .select("id,created_at,survey,coffee_taste,machine_experience,comments", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);
  const rows = data ?? [];

  return (
    <>
      <PageHeader title="שאלונים" description="תשובות לשאלוני שביעות הרצון (עמודים שנגישים רק דרך ברקוד)." />
      {error && (
        <div className="mb-6">
          <Notice tone="warning">
            טבלת התשובות עדיין לא קיימת במסד הנתונים. יש להריץ ב-Supabase את הקובץ
            supabase/migrations/20261008090000_coffee_flow_survey_responses.sql.
          </Notice>
        </div>
      )}

      {surveys.map((survey) => {
        const answers = rows.filter((row) => row.survey === survey.slug);
        return (
          <Card key={survey.slug} className="mb-8">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-heading text-lg font-semibold text-ink">{survey.customer}</h2>
              <span className="text-sm text-muted" dir="ltr">
                /survey/{survey.slug}
              </span>
            </div>
            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              <Stat label="מספר תשובות" value={String(answers.length)} />
              {surveyQuestions.map((question) => (
                <Stat
                  key={question.name}
                  label={`${question.label} (ממוצע)`}
                  value={average(answers.map((row) => row[question.name]))}
                />
              ))}
            </div>
            {answers.length === 0 ? (
              <p className="text-sm text-muted">עדיין אין תשובות.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-right text-sm">
                  <thead>
                    <tr className="border-b border-line text-xs text-muted">
                      <th className="py-2 pe-4 font-semibold">תאריך</th>
                      <th className="py-2 pe-4 font-semibold">טעם הקפה</th>
                      <th className="py-2 pe-4 font-semibold">חוויית המכונה</th>
                      <th className="py-2 font-semibold">הערות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {answers.map((row) => (
                      <tr key={row.id} className="border-b border-line/60 align-top">
                        <td className="whitespace-nowrap py-3 pe-4 text-muted">{formatDateTime(row.created_at)}</td>
                        <td className="py-3 pe-4 font-semibold text-ink">{row.coffee_taste}</td>
                        <td className="py-3 pe-4 font-semibold text-ink">{row.machine_experience}</td>
                        <td className="whitespace-pre-wrap py-3 text-ink">{row.comments || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        );
      })}
      {(count ?? 0) > PAGE_SIZE && <p className="text-xs text-muted">מוצגות {PAGE_SIZE} התשובות האחרונות.</p>}
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-heading text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
