import { useState } from "react";
import gameConfig from "../config/lemonade_land_v1.json";
import type { GameConfig } from "../types/gameConfig";

const config = gameConfig as unknown as GameConfig;

interface GameState {
  cashCents: number;
  priceCents: number;
  day: number;
  totalProfitCents: number;
  cupsSold: number;
  upgrades: string[];
  saveJarCents: number;
  spendJarCents: number;
  giveJarCents: number;
}

export default function LemonadeLand({ onBack }: { onBack: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    cashCents: config.economy.start_cash_cents,
    priceCents: config.economy.pricing.default_price_cents,
    day: 1,
    totalProfitCents: 0,
    cupsSold: 0,
    upgrades: ["stand_basic"],
    saveJarCents: 0,
    spendJarCents: 0,
    giveJarCents: 0,
  });

  const [weather, setWeather] = useState(0);
  const [demandBoost, setDemandBoost] = useState(0);
  const [capacity, setCapacity] = useState(config.economy.capacity.base_capacity);
  const [unitCostDiscount, setUnitCostDiscount] = useState(0);

  // Calculate unit cost with discounts
  const unitCostCents =
    config.economy.unit_costs_cents.cup +
    config.economy.unit_costs_cents.lemon +
    config.economy.unit_costs_cents.sugar +
    config.economy.unit_costs_cents.ice -
    unitCostDiscount;

  // Calculate demand
  const calculateDemand = () => {
    const base = config.economy.base_demand;
    const priceImpact = config.economy.price_sensitivity * (gameState.priceCents / 100);
    const totalDemand = Math.round(base + weather + demandBoost - priceImpact);
    return Math.max(0, Math.min(totalDemand, capacity));
  };

  const runDay = () => {
    const cupsSold = calculateDemand();
    const revenueCents = cupsSold * gameState.priceCents;
    const costCents = cupsSold * unitCostCents + config.economy.fixed_daily_cost_cents;
    const profitCents = revenueCents - costCents;

    const newCash = gameState.cashCents + profitCents;
    const newDay = gameState.day + 1;

    // Auto-split profits into jars
    const saveAmount = Math.floor(profitCents * (config.wallet.jars[0].default_split_pct / 100));
    const spendAmount = Math.floor(profitCents * (config.wallet.jars[1].default_split_pct / 100));
    const giveAmount = profitCents - saveAmount - spendAmount;

    setGameState({
      ...gameState,
      cashCents: newCash,
      day: newDay,
      totalProfitCents: gameState.totalProfitCents + profitCents,
      cupsSold: gameState.cupsSold + cupsSold,
      saveJarCents: gameState.saveJarCents + saveAmount,
      spendJarCents: gameState.spendJarCents + spendAmount,
      giveJarCents: gameState.giveJarCents + giveAmount,
    });

    // Random weather for next day
    const [min, max] = config.economy.weather_factor_range;
    setWeather(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const buyUpgrade = (itemId: string) => {
    const item = config.builder.items.find((i) => i.id === itemId);
    if (!item) return;

    if (gameState.cashCents >= item.cost_cents) {
      setGameState({
        ...gameState,
        cashCents: gameState.cashCents - item.cost_cents,
        upgrades: [...gameState.upgrades, itemId],
      });

      // Apply effects
      if (item.effects) {
        item.effects.forEach((effect) => {
          if (effect.effect === "capacity_add") {
            setCapacity((c) => c + effect.value);
          } else if (effect.effect === "demand_add") {
            setDemandBoost((d) => d + effect.value);
          } else if (effect.effect === "unit_cost_discount_cents") {
            setUnitCostDiscount((u) => u + effect.value);
          }
        });
      }
    }
  };

  const formatCents = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const availableUpgrades = config.builder.items.filter(
    (item) => !gameState.upgrades.includes(item.id) && item.id !== "stand_basic"
  );

  const currentDemand = calculateDemand();

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background:
          "radial-gradient(1200px 800px at 20% 10%, rgba(122,167,255,.18), transparent 55%), radial-gradient(900px 700px at 85% 25%, rgba(99,243,166,.12), transparent 55%), #0b1220",
        color: "#e9f0ff",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl cursor-pointer"
              style={{
                background: "rgba(255,255,255,.1)",
                border: "1px solid rgba(255,255,255,.10)",
                color: "#e9f0ff",
              }}
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold">{config.world.title}</h1>
          </div>
          <div className="text-sm" style={{ color: "#8aa0c3" }}>
            Day {gameState.day} of {config.day_simulation.max_days_per_session}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Card */}
            <div
              className="rounded-[18px] p-6"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 className="text-xl font-bold mb-4">Your Stand</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm" style={{ color: "#8aa0c3" }}>
                    Cash
                  </div>
                  <div className="text-2xl font-bold">{formatCents(gameState.cashCents)}</div>
                </div>
                <div>
                  <div className="text-sm" style={{ color: "#8aa0c3" }}>
                    Total Profit
                  </div>
                  <div className="text-2xl font-bold">{formatCents(gameState.totalProfitCents)}</div>
                </div>
                <div>
                  <div className="text-sm" style={{ color: "#8aa0c3" }}>
                    Cups Sold
                  </div>
                  <div className="text-2xl font-bold">{gameState.cupsSold}</div>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div
              className="rounded-[18px] p-6"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 className="text-xl font-bold mb-4">Set Your Price</h2>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: "#8aa0c3" }}>Price per cup</span>
                  <span className="text-2xl font-bold">{formatCents(gameState.priceCents)}</span>
                </div>
                <input
                  type="range"
                  min={config.economy.pricing.min_price_cents}
                  max={config.economy.pricing.max_price_cents}
                  step={config.economy.pricing.step_cents}
                  value={gameState.priceCents}
                  onChange={(e) =>
                    setGameState({ ...gameState, priceCents: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "#8aa0c3" }}>
                  <span>{formatCents(config.economy.pricing.min_price_cents)}</span>
                  <span>{formatCents(config.economy.pricing.max_price_cents)}</span>
                </div>
              </div>
              <div className="mb-4 p-3 rounded-xl" style={{ background: "rgba(255,255,255,.03)" }}>
                <div className="text-sm mb-2" style={{ color: "#8aa0c3" }}>
                  Expected Demand: <span className="font-bold text-white">{currentDemand} cups</span>
                </div>
                <div className="text-sm" style={{ color: "#8aa0c3" }}>
                  Weather:{" "}
                  <span className={weather > 0 ? "text-green-400" : weather < 0 ? "text-red-400" : ""}>
                    {weather > 0 ? "+" : ""}
                    {weather}
                  </span>
                </div>
                <div className="text-sm" style={{ color: "#8aa0c3" }}>
                  Capacity: <span className="font-bold text-white">{capacity} cups</span>
                </div>
              </div>
              <button
                onClick={runDay}
                disabled={gameState.day > config.day_simulation.max_days_per_session}
                className="w-full px-4 py-3 rounded-xl font-bold cursor-pointer disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #63f3a6, #38d38a)",
                  color: "#062012",
                }}
              >
                Run Day {gameState.day}
              </button>
            </div>

            {/* Upgrades Card */}
            <div
              className="rounded-[18px] p-6"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 className="text-xl font-bold mb-4">Upgrades</h2>
              <div className="grid grid-cols-2 gap-3">
                {availableUpgrades.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => buyUpgrade(item.id)}
                    disabled={gameState.cashCents < item.cost_cents}
                    className="p-3 rounded-xl text-left disabled:opacity-50"
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.10)",
                    }}
                  >
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm" style={{ color: "#8aa0c3" }}>
                      {formatCents(item.cost_cents)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Jars */}
            <div
              className="rounded-[18px] p-6"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 className="text-xl font-bold mb-4">Your Jars</h2>
              <div className="space-y-3">
                {[
                  { id: "save", label: "Save", amount: gameState.saveJarCents, color: "#63f3a6" },
                  { id: "spend", label: "Spend", amount: gameState.spendJarCents, color: "#7aa7ff" },
                  { id: "give", label: "Give", amount: gameState.giveJarCents, color: "#f59e0b" },
                ].map((jar) => (
                  <div key={jar.id} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,.03)" }}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{jar.label}</span>
                      <span className="font-bold" style={{ color: jar.color }}>
                        {formatCents(jar.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missions */}
            <div
              className="rounded-[18px] p-6"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 className="text-xl font-bold mb-4">Missions</h2>
              <div className="space-y-3">
                {config.missions.map((mission) => (
                  <div
                    key={mission.id}
                    className="p-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.10)",
                    }}
                  >
                    <div className="font-bold text-sm mb-1">{mission.title}</div>
                    <div className="text-xs" style={{ color: "#8aa0c3" }}>
                      {mission.hint}
                    </div>
                    <div className="text-xs mt-2" style={{ color: "#63f3a6" }}>
                      Reward: {mission.reward.xp} XP + Badge
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
