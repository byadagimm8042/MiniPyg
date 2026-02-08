interface WhatSetsApartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatSetsApartModal({
  isOpen,
  onClose,
}: WhatSetsApartModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-[18px] z-[999] overflow-y-auto"
      style={{ background: "rgba(0,0,0,.55)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-4xl rounded-[18px] p-8 my-8"
        style={{
          border: "1px solid rgba(255,255,255,.10)",
          background: "rgba(18,27,46,.98)",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold" style={{ letterSpacing: ".2px" }}>
            What sets MiniPyg MoneyWise Kids apart
          </h2>
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

        <div className="space-y-6" style={{ color: "#e9f0ff", lineHeight: "1.8" }}>
          <p className="text-lg">
            What sets <strong>MiniPyg MoneyWise Kids</strong> apart is that we don't treat financial literacy as a list of topics to memorize — we treat it as a set of <strong>habits kids build through repeated practice</strong>. MiniPyg MoneyWise Kids is designed around the idea that money confidence doesn't come from knowing definitions, but from <strong>making decisions, seeing outcomes, and doing it again</strong> until good choices become second nature.
          </p>

          <p>
            A lemonade stand leads to pricing decisions. Pricing leads to profits. Profits lead to saving or reinvesting. As kids repeat this loop, they see how small choices compound — not because we tell them, but because they experience it. MiniPyg MoneyWise Kids focuses on the <strong>full money system</strong>, we start early, before habits are formed incorrectly or money becomes abstract and intimidating. Kids don't just learn about saving, budgeting, or investing — they <strong>practice earning, spending, saving, giving, and reinvesting in small, safe environments</strong>. Over time, these repeated actions form real money habits. That's the game-changer.
          </p>

          <p>
            MiniPyg MoneyWise Kids uses a <strong>building-block approach</strong> rooted in how kids actually learn. Concepts grow in complexity as the child grows, and math skills are reinforced naturally through play. Characters and storytelling make ideas concrete, while sandbox environments give kids the freedom to experiment, fail safely, and try again.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.10)" }}>
            <div>
              <div className="text-2xl mb-2">🎮</div>
              <div className="font-bold mb-2">For kids</div>
              <div style={{ color: "#8aa0c3", fontSize: "14px" }}>
                MiniPyg MoneyWise Kids feels like play.
              </div>
            </div>
            <div>
              <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
              <div className="font-bold mb-2">For parents</div>
              <div style={{ color: "#8aa0c3", fontSize: "14px" }}>
                It feels like clarity — a way to teach money skills without lectures or pressure.
              </div>
            </div>
            <div>
              <div className="text-2xl mb-2">🏫</div>
              <div className="font-bold mb-2">For schools</div>
              <div style={{ color: "#8aa0c3", fontSize: "14px" }}>
                It's a pedagogy-first platform focused on habits, reasoning, and long-term understanding.
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl" style={{ 
            background: "rgba(99,243,166,.08)",
            border: "1px solid rgba(99,243,166,.25)"
          }}>
            <p className="text-lg font-semibold mb-2" style={{ color: "#dfffea" }}>
              MiniPyg MoneyWise Kids' goal is simple:
            </p>
            <p style={{ color: "#dfffea" }}>
              to help kids enter adolescence and adulthood already comfortable making money decisions — because they've <strong>built the habits</strong> through practice, not memorization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
