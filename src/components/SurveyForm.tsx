"use client";

import { FormEvent, useState } from "react";
import { submitSurvey } from "@/lib/survey-actions";
import { SURVEY_COMMENTS_MAX, surveyQuestions } from "@/lib/surveys";

const SCALE = [1, 2, 3, 4, 5];

export default function SurveyForm({ survey }: { survey: string }) {
  // One id per page view, so a retried submission is stored once.
  const [submissionId] = useState(() => crypto.randomUUID());
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    const result = await submitSurvey(new FormData(event.currentTarget)).catch(() => ({
      ok: false as const,
      message: "לא הצלחנו לשמור את התשובה. נסו שוב בעוד רגע.",
    }));
    if (result.ok) {
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStatus("idle");
      setError(result.message);
    }
  }

  if (status === "done") {
    return (
      <div className="survey-thanks" role="status">
        <h2 className="h2">תודה רבה!</h2>
        <p className="subheading">התשובות שלכם התקבלו ויעזרו לנו להמשיך לשפר את הקפה ואת השירות.</p>
      </div>
    );
  }

  return (
    <form className="survey-form" onSubmit={onSubmit}>
      <input type="hidden" name="survey" value={survey} />
      <input type="hidden" name="submission_id" value={submissionId} />
      <div className="survey-honeypot" aria-hidden="true">
        <label>
          אתר החברה
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {surveyQuestions.map((question, index) => (
        <fieldset className="survey-question" key={question.name}>
          <legend>
            <span className="survey-number">{index + 1}</span>
            {question.label}
          </legend>
          <div className="survey-scale">
            {SCALE.map((value) => (
              <label className="survey-option" key={value}>
                <input type="radio" name={question.name} value={value} required />
                <span>{value}</span>
              </label>
            ))}
          </div>
          <div className="survey-scale-hint" aria-hidden="true">
            <span>1 – נמוך</span>
            <span>5 – הכי גבוה</span>
          </div>
        </fieldset>
      ))}

      <label className="survey-question survey-comments">
        <span className="survey-legend">
          <span className="survey-number">{surveyQuestions.length + 1}</span>
          הערות
        </span>
        <textarea name="comments" rows={5} maxLength={SURVEY_COMMENTS_MAX} placeholder="ספרו לנו מה אהבתם ומה אפשר לשפר (לא חובה)" />
      </label>

      {error && (
        <p className="survey-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-gold survey-submit" disabled={status === "sending"}>
        {status === "sending" ? "שולח…" : "שליחה"}
      </button>
    </form>
  );
}
