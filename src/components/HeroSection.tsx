interface HeroSectionProps {
  onTryGame: () => void;
  onScrollToPricing: () => void;
  onScrollToCommit: () => void;
  onShowWhatSetsApart: () => void;
}

export default function HeroSection({
  onTryGame,
  onScrollToPricing,
  onScrollToCommit,
  onShowWhatSetsApart,
}: HeroSectionProps) {
  return (
    <div
      className="rounded-[18px] p-[18px]"
      style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.10)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="inline-block px-3 py-2 rounded-full text-[13px] mb-4"
        style={{
          border: "1px solid rgba(255,255,255,.10)",
          background: "rgba(255,255,255,.03)",
          color: "#8aa0c3",
        }}
      >
        Microlearning + Streaks + Daily Missions
      </div>
      <h1
        className="mb-[10px] mt-2"
        style={{
          fontSize: "38px",
          lineHeight: "1.05",
          fontWeight: "700",
        }}
      >
        Short daily games that build real money habits for kids.
      </h1>
      <p className="mb-4" style={{ color: "#8aa0c3", lineHeight: "1.5" }}>
        MiniPyg MoneyWise Kids helps kids practice earning, saving, and investing through
        5–10 minute missions. Parents can see progress — without opening
        accounts or buying debit cards.
      </p>

      <ul className="mt-[14px] mb-4 space-y-[10px] list-none p-0">
        {[
          {
            title: "Daily Missions + Streaks",
            desc: "5 minutes a day builds long-term confidence.",
          },
          {
            title: "Games + Simulations",
            desc: "Needs vs. wants, budgeting, lemonade stand, investing basics.",
            showButton: true,
            buttonText: "🎮 Try Lemonade Land",
            buttonAction: onTryGame,
          },
          {
            title: "Parent Visibility",
            desc: "Dashboards show skills learned, streaks, and milestones.",
          },
        ].map((item, idx) => (
          <li
            key={idx}
            className="flex gap-[10px] items-start p-[10px_12px] rounded-[14px]"
            style={{
              border: "1px solid rgba(255,255,255,.10)",
              background: "rgba(255,255,255,.03)",
            }}
          >
            <span
              className="w-[10px] h-[10px] rounded-full mt-[5px] flex-shrink-0"
              style={{ background: "#63f3a6" }}
            />
            <div className="flex-1">
              <b>{item.title}</b>
              <br />
              <span style={{ color: "#8aa0c3" }}>{item.desc}</span>
              {(item as any).showButton && (
                <div className="mt-3">
                  <button
                    onClick={(item as any).buttonAction}
                    className="px-[14px] py-2 rounded-xl border-0 cursor-pointer transition-transform active:translate-y-px text-sm"
                    style={{
                      background: "linear-gradient(135deg, #7aa7ff, #6366f1)",
                      color: "#ffffff",
                      fontWeight: "700",
                    }}
                  >
                    {(item as any).buttonText}
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* What Sets Us Apart Box */}
      <div
        className="mt-6 p-4 rounded-[14px]"
        style={{
          border: "1px solid rgba(255,255,255,.10)",
          background: "rgba(255,255,255,.03)",
        }}
      >
        <div className="flex items-start gap-3">
          <span
            className="w-[10px] h-[10px] rounded-full mt-[5px] flex-shrink-0"
            style={{ background: "#63f3a6" }}
          />
          <div className="flex-1">
            <b className="block mb-1">What sets us apart</b>
            <p className="text-sm mb-3" style={{ color: "#8aa0c3" }}>
              Learn how MiniPyg MoneyWise Kids builds real money habits through practice, not memorization.
            </p>
            <button
              onClick={onShowWhatSetsApart}
              className="px-[14px] py-2 rounded-xl border-0 cursor-pointer transition-transform active:translate-y-px text-sm"
              style={{
                background: "linear-gradient(135deg, #63f3a6, #38d38a)",
                color: "#062012",
                fontWeight: "700",
              }}
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-[10px] mt-[14px]">
        <button
          onClick={onScrollToPricing}
          className="px-[14px] py-3 rounded-xl border-0 cursor-pointer transition-transform active:translate-y-px"
          style={{
            background: "linear-gradient(135deg, #63f3a6, #38d38a)",
            color: "#062012",
            fontWeight: "700",
          }}
        >
          See early access pricing
        </button>
        <button
          onClick={onScrollToCommit}
          className="px-[14px] py-3 rounded-xl cursor-pointer transition-transform active:translate-y-px"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,.10)",
            color: "#e9f0ff",
            fontWeight: "700",
          }}
        >
          Join the 14-day habit pilot
        </button>
      </div>

      <div className="text-xs mt-[10px]" style={{ color: "#8aa0c3" }}>
        We're running a small early access pilot. No payment is collected
        on this page.
      </div>
    </div>
  );
}
