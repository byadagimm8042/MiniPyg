// Type definitions for the Lemonade Land game configuration

export interface WorldConfig {
  id: string;
  title: string;
  age_band: string;
  description: string;
  currency: {
    symbol: string;
    minor_unit: string;
  };
}

export interface EconomyConfig {
  start_cash_cents: number;
  base_demand: number;
  price_sensitivity: number;
  weather_factor_range: [number, number];
  fixed_daily_cost_cents: number;
  pricing: {
    min_price_cents: number;
    max_price_cents: number;
    step_cents: number;
    default_price_cents: number;
  };
  capacity: {
    base_capacity: number;
  };
  unit_costs_cents: {
    cup: number;
    lemon: number;
    sugar: number;
    ice: number;
  };
}

export interface BuilderItem {
  id: string;
  name: string;
  type: "core" | "marketing" | "capacity" | "ops";
  cost_cents: number;
  max_level: number;
  effects?: Array<{ effect: string; value: number }>;
  effects_by_level?: {
    [level: string]: Array<{ effect: string; value: number }>;
  };
}

export interface BuilderConfig {
  grid: { rows: number; cols: number };
  starting_tiles: Array<{ item_id: string; x: number; y: number }>;
  items: BuilderItem[];
}

export interface DaySimulationConfig {
  formula: string;
  notes: string;
  max_days_per_session: number;
}

export interface WalletConfig {
  jars: Array<{
    id: string;
    label: string;
    default_split_pct: number;
  }>;
  reward_xp_per_day_run: number;
  reward_xp_per_mission: number;
}

export interface Mission {
  id: string;
  title: string;
  goal: {
    type: string;
    [key: string]: any;
  };
  reward: {
    xp: number;
    badge_id: string;
  };
  hint: string;
}

export interface Badge {
  id: string;
  name: string;
}

export interface ReflectionPrompt {
  id: string;
  prompt: string;
}

export interface GameConfig {
  version: string;
  world: WorldConfig;
  economy: EconomyConfig;
  builder: BuilderConfig;
  day_simulation: DaySimulationConfig;
  wallet: WalletConfig;
  missions: Mission[];
  badges: Badge[];
  reflection_prompts: ReflectionPrompt[];
}
