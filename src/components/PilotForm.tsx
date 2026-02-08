import { useState } from "react";
import { submitToGoogleSheets } from "../utils/formSubmission";

interface PilotFormProps {
  onSuccess: () => void;
}

export default function PilotForm({ onSuccess }: PilotFormProps) {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    ageBand: "",
    frequency: "",
    commitCheck: false,
    feedbackCheck: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.parentName.trim()) {
      newErrors.parentName = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.ageBand) {
      newErrors.ageBand = "Please select an age band";
    }
    
    if (!formData.commitCheck) {
      newErrors.commitCheck = "Please confirm your commitment";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitToGoogleSheets('pilot', {
        name: formData.parentName,
        email: formData.email,
        ageBand: formData.ageBand,
        frequency: formData.frequency,
        commit: formData.commitCheck,
        feedback: formData.feedbackCheck,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          parentName: "",
          email: "",
          ageBand: "",
          frequency: "",
          commitCheck: false,
          feedbackCheck: false,
        });
        onSuccess();
      } else {
        setErrors({ submit: result.error || "Failed to submit. Please try again." });
      }
    } catch (error) {
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="commit"
      className="rounded-[18px] p-[18px]"
      style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.10)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="mb-3 mt-7" style={{ letterSpacing: ".2px" }}>
        Join the 14-Day MiniPyg MoneyWise Kids Habit Pilot
      </div>
      <div className="mb-3" style={{ color: "#8aa0c3", lineHeight: "1.5" }}>
        This is a commitment test (not a payment). We're looking for
        parents willing to try MiniPyg MoneyWise Kids with their child for{" "}
        <b>5 minutes/day</b> and share feedback.
      </div>

      <form onSubmit={handleSubmit} className="space-y-[10px] mt-3">
        <div className="grid lg:grid-cols-2 gap-[10px]">
          <div>
            <label
              className="text-[13px] block mb-1"
              style={{ color: "#8aa0c3" }}
            >
              Parent Name *
            </label>
            <input
              value={formData.parentName}
              onChange={(e) =>
                setFormData({ ...formData, parentName: e.target.value })
              }
              placeholder="Your name"
              className="w-full px-3 py-3 rounded-xl outline-none"
              style={{
                border: errors.parentName
                  ? "1px solid rgba(255,107,107,.50)"
                  : "1px solid rgba(255,255,255,.10)",
                background: "rgba(7,10,18,.45)",
                color: "#e9f0ff",
              }}
            />
            {errors.parentName && (
              <div className="text-xs mt-1" style={{ color: "#ff6b6b" }}>
                {errors.parentName}
              </div>
            )}
          </div>
          <div>
            <label
              className="text-[13px] block mb-1"
              style={{ color: "#8aa0c3" }}
            >
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@email.com"
              className="w-full px-3 py-3 rounded-xl outline-none"
              style={{
                border: errors.email
                  ? "1px solid rgba(255,107,107,.50)"
                  : "1px solid rgba(255,255,255,.10)",
                background: "rgba(7,10,18,.45)",
                color: "#e9f0ff",
              }}
            />
            {errors.email && (
              <div className="text-xs mt-1" style={{ color: "#ff6b6b" }}>
                {errors.email}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-[10px]">
          <div>
            <label
              className="text-[13px] block mb-1"
              style={{ color: "#8aa0c3" }}
            >
              Child Age Band *
            </label>
            <select
              value={formData.ageBand}
              onChange={(e) =>
                setFormData({ ...formData, ageBand: e.target.value })
              }
              className="w-full px-3 py-3 rounded-xl outline-none"
              style={{
                border: errors.ageBand
                  ? "1px solid rgba(255,107,107,.50)"
                  : "1px solid rgba(255,255,255,.10)",
                background: "rgba(7,10,18,.45)",
                color: "#e9f0ff",
              }}
            >
              <option value="">Select</option>
              <option>8–10</option>
              <option>11–13</option>
              <option>14–17</option>
            </select>
            {errors.ageBand && (
              <div className="text-xs mt-1" style={{ color: "#ff6b6b" }}>
                {errors.ageBand}
              </div>
            )}
          </div>
          <div>
            <label
              className="text-[13px] block mb-1"
              style={{ color: "#8aa0c3" }}
            >
              How often can they play?
            </label>
            <select
              value={formData.frequency}
              onChange={(e) =>
                setFormData({ ...formData, frequency: e.target.value })
              }
              className="w-full px-3 py-3 rounded-xl outline-none"
              style={{
                border: "1px solid rgba(255,255,255,.10)",
                background: "rgba(7,10,18,.45)",
                color: "#e9f0ff",
              }}
            >
              <option value="">Select</option>
              <option>Daily (best)</option>
              <option>3–4x per week</option>
              <option>1–2x per week</option>
            </select>
          </div>
        </div>

        <div
          className="flex gap-[10px] items-start p-3 rounded-[14px]"
          style={{
            border: errors.commitCheck
              ? "1px solid rgba(255,107,107,.50)"
              : "1px solid rgba(255,255,255,.10)",
            background: "rgba(255,255,255,.03)",
          }}
        >
          <input
            type="checkbox"
            checked={formData.commitCheck}
            onChange={(e) =>
              setFormData({ ...formData, commitCheck: e.target.checked })
            }
            className="mt-1"
            style={{ width: "auto" }}
          />
          <div>
            <b style={{ color: "#e9f0ff" }}>
              I commit to trying MiniPyg MoneyWise Kids for 5 minutes/day for 14 days *
            </b>
            <br />
            <span style={{ color: "#8aa0c3" }}>
              We'll send a short checklist and one feedback form.
            </span>
            {errors.commitCheck && (
              <div className="text-xs mt-1" style={{ color: "#ff6b6b" }}>
                {errors.commitCheck}
              </div>
            )}
          </div>
        </div>

        <div
          className="flex gap-[10px] items-start p-3 rounded-[14px]"
          style={{
            border: "1px solid rgba(255,255,255,.10)",
            background: "rgba(255,255,255,.03)",
          }}
        >
          <input
            type="checkbox"
            checked={formData.feedbackCheck}
            onChange={(e) =>
              setFormData({ ...formData, feedbackCheck: e.target.checked })
            }
            className="mt-1"
            style={{ width: "auto" }}
          />
          <div>
            <b style={{ color: "#e9f0ff" }}>
              I'm willing to provide feedback
            </b>
            <br />
            <span style={{ color: "#8aa0c3" }}>
              Quick survey + optional 15-minute call.
            </span>
          </div>
        </div>

        {errors.submit && (
          <div
            className="p-3 rounded-[14px] text-sm"
            style={{
              border: "1px solid rgba(255,107,107,.35)",
              background: "rgba(255,107,107,.10)",
              color: "#ffe1e1",
            }}
          >
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-[14px] py-3 rounded-xl border-0 cursor-pointer transition-transform active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #63f3a6, #38d38a)",
            color: "#062012",
            fontWeight: "700",
          }}
        >
          {isSubmitting ? "Submitting..." : "Join pilot (no payment)"}
        </button>

        {submitSuccess && (
          <div
            className="mt-3 p-3 rounded-[14px] text-sm"
            style={{
              border: "1px solid rgba(99,243,166,.35)",
              background: "rgba(99,243,166,.08)",
              color: "#dfffea",
            }}
          >
            ✅ You're in. We'll email early access details and the 14-day
            pilot checklist.
          </div>
        )}

        <div className="text-xs mt-[10px]" style={{ color: "#8aa0c3" }}>
          By submitting, you agree to be contacted about the MiniPyg MoneyWise Kids early
          access pilot.
        </div>
      </form>
    </div>
  );
}
