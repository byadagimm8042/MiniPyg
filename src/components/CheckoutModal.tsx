import { useState } from "react";
import { submitToGoogleSheets } from "../utils/formSubmission";

interface CheckoutModalProps {
  isOpen: boolean;
  plan: { name: string; price: number } | null;
  onClose: () => void;
}

export default function CheckoutModal({
  isOpen,
  plan,
  onClose,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    commit: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
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
      const result = await submitToGoogleSheets('checkout', {
        name: formData.name,
        email: formData.email,
        plan: plan.name,
        price: plan.price,
        commit: formData.commit,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", commit: false });
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
      className="fixed inset-0 flex items-center justify-center p-[18px] z-[999]"
      style={{ background: "rgba(0,0,0,.55)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-[560px] rounded-[18px] p-4"
        style={{
          border: "1px solid rgba(255,255,255,.10)",
          background: "rgba(18,27,46,.98)",
        }}
      >
        <div className="flex justify-between items-center gap-[10px] mb-3">
          <div>
            <div
              className="inline-block px-3 py-2 rounded-full text-[13px] mb-2"
              style={{
                border: "1px solid rgba(255,255,255,.10)",
                background: "rgba(255,255,255,.03)",
                color: "#8aa0c3",
              }}
            >
              Reserve Your Spot
            </div>
            <h2 className="mt-[10px] mb-0">{plan.name}</h2>
            <div style={{ color: "#8aa0c3" }}>
              {plan.price >= 1000
                ? `$${plan.price}/year (pilot request)`
                : `$${plan.price}/month`}
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-[10px] py-2 rounded-[10px] cursor-pointer transition-transform active:translate-y-px"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,.10)",
              color: "#e9f0ff",
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div
          className="mt-[10px] p-[10px_12px] rounded-xl text-[13px]"
          style={{
            border: "1px solid rgba(99,243,166,.35)",
            background: "rgba(99,243,166,.08)",
            color: "#dfffea",
          }}
        >
          <b>No payment required.</b> Reserve your early access spot and we'll 
          contact you with next steps and onboarding details.
        </div>

        <form onSubmit={handleSubmit} className="space-y-[10px] mt-[10px]">
          <div className="grid lg:grid-cols-2 gap-[10px]">
            <div>
              <label
                className="text-[13px] block mb-1"
                style={{ color: "#8aa0c3" }}
              >
                Name *
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your name"
                className="w-full px-3 py-3 rounded-xl outline-none"
                style={{
                  border: errors.name
                    ? "1px solid rgba(255,107,107,.50)"
                    : "1px solid rgba(255,255,255,.10)",
                  background: "rgba(7,10,18,.45)",
                  color: "#e9f0ff",
                }}
              />
              {errors.name && (
                <div className="text-xs mt-1" style={{ color: "#ff6b6b" }}>
                  {errors.name}
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

          <div
            className="flex gap-[10px] items-start p-3 rounded-[14px]"
            style={{
              border: "1px solid rgba(255,255,255,.10)",
              background: "rgba(255,255,255,.03)",
            }}
          >
            <input
              type="checkbox"
              checked={formData.commit}
              onChange={(e) =>
                setFormData({ ...formData, commit: e.target.checked })
              }
              className="mt-1"
              style={{ width: "auto" }}
            />
            <div>
              <b style={{ color: "#e9f0ff" }}>
                I'm willing to try MiniPyg MoneyWise Kids for 14 days
              </b>
              <br />
              <span style={{ color: "#8aa0c3" }}>5–10 minutes per day.</span>
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
            {isSubmitting ? "Submitting..." : "Reserve Early Access"}
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
              ✅ Thanks! You've reserved early access. We'll email next steps
              shortly.
            </div>
          )}

          <div className="text-xs mt-[10px]" style={{ color: "#8aa0c3" }}>
            Want a different plan? Close this window and select another
            option.
          </div>
        </form>
      </div>
    </div>
  );
}
