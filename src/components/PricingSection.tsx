interface PricingSectionProps {
  onSelectPlan: (planName: string, price: number) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      name: "Premium",
      price: 5,
      period: "/month",
      tag: "Most Popular",
      desc: "Best for one child learning daily.",
      features: [
        "Full lessons + games",
        "Streaks, badges, rewards",
        "Parent dashboard",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Family Plus",
      price: 9,
      period: "/month",
      tag: null,
      desc: "Up to 3 kids in one household.",
      features: [
        "Multiple kids profiles",
        "Family challenges",
        "Weekly summaries",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "School Pilot",
      price: 1500,
      period: "/year",
      tag: null,
      desc: "Up to 5 classrooms.",
      features: [
        "Teacher dashboard",
        "Standards alignment",
        "Auto-graded checks",
      ],
      cta: "Request Pilot",
      showQuote: true,
    },
  ];

  return (
    <>
      <div id="pricing" className="mb-3 mt-7" style={{ letterSpacing: ".2px" }}>
        Early Access Pricing
      </div>
      <div className="mb-3" style={{ color: "#8aa0c3", lineHeight: "1.5" }}>
        We're testing pricing for MiniPyg MoneyWise Kids Premium. Clicking "Start Free Trial"
        does <b>not</b> charge you — we'll contact you with early access details.
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mb-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative rounded-[18px] p-[18px]"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.10)",
              backdropFilter: "blur(8px)",
            }}
          >
            {plan.tag && (
              <div
                className="absolute top-3 right-3 text-xs px-[10px] py-[6px] rounded-full"
                style={{
                  background: "rgba(122,167,255,.18)",
                  border: "1px solid rgba(122,167,255,.25)",
                  color: "#cfe0ff",
                }}
              >
                {plan.tag}
              </div>
            )}
            <h3 className="mb-2">{plan.name}</h3>
            <div className="my-2">
              {(plan as any).showQuote ? (
                <span className="text-[24px] font-black" style={{ color: "#7aa7ff" }}>
                  Request Quote
                </span>
              ) : (
                <>
                  <span className="text-[34px] font-black">
                    ${plan.price}
                  </span>
                  <span className="text-sm ml-1" style={{ color: "#8aa0c3" }}>
                    {plan.period}
                  </span>
                </>
              )}
            </div>
            <div className="mb-[10px]" style={{ color: "#8aa0c3" }}>
              {plan.desc}
            </div>
            <ul
              className="mt-[10px] mb-3 pl-4 list-disc"
              style={{ color: "#8aa0c3", lineHeight: "1.55" }}
            >
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => onSelectPlan(plan.name, plan.price)}
              className="w-full px-[14px] py-3 rounded-xl border-0 cursor-pointer transition-transform active:translate-y-px mt-3"
              style={{
                background: "linear-gradient(135deg, #63f3a6, #38d38a)",
                color: "#062012",
                fontWeight: "700",
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="text-xs mt-3" style={{ color: "#8aa0c3" }}>
        Education-first promise: MiniPyg MoneyWise Kids does not sell bank accounts, debit
        cards, or financial products.
      </div>
    </>
  );
}
