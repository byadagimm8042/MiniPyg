import piggyBankIcon from "../assets/piggy-bank-icon.svg";

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-3 mb-7">
      <div className="flex items-center gap-[10px] font-extrabold tracking-wide">
        <img
          src={piggyBankIcon}
          alt="MiniPyg MoneyWise Kids"
          className="w-[38px] h-[38px]"
        />
        <div>MiniPyg MoneyWise Kids</div>
      </div>
      <div
        className="px-3 py-2 rounded-full text-[13px]"
        style={{
          border: "1px solid rgba(255,255,255,.10)",
          background: "rgba(255,255,255,.03)",
          color: "#8aa0c3",
        }}
      >
        Education-first • No bank products • Kid-safe
      </div>
    </div>
  );
}
