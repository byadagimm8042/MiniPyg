import { useState } from "react";
import LemonadeLand from "./components/LemonadeLand";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PilotForm from "./components/PilotForm";
import PricingSection from "./components/PricingSection";
import WhatSetsApartModal from "./components/WhatSetsApartModal";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "game">("landing");
  const [showWhatSetsApart, setShowWhatSetsApart] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectPlan = (planName: string, price: number) => {
    setSelectedPlan({ name: planName, price });
    setShowCheckoutModal(true);
  };

  const handlePilotSuccess = () => {
    // Success is handled within PilotForm component
  };

  // Show game if currentView is "game"
  if (currentView === "game") {
    return <LemonadeLand onBack={() => setCurrentView("landing")} />;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(1200px 800px at 20% 10%, rgba(122,167,255,.18), transparent 55%), radial-gradient(900px 700px at 85% 25%, rgba(99,243,166,.12), transparent 55%), #0b1220",
        color: "#e9f0ff",
      }}
    >
      <div className="max-w-[1080px] mx-auto px-[18px] pt-7 pb-16">
        <Header />

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-[18px] items-stretch mb-7">
          <HeroSection
            onTryGame={() => setCurrentView("game")}
            onScrollToPricing={() => scrollToSection("pricing")}
            onScrollToCommit={() => scrollToSection("commit")}
            onShowWhatSetsApart={() => setShowWhatSetsApart(true)}
          />
          <PilotForm onSuccess={handlePilotSuccess} />
        </div>

        <PricingSection onSelectPlan={handleSelectPlan} />
      </div>

      {/* Modals */}
      <WhatSetsApartModal
        isOpen={showWhatSetsApart}
        onClose={() => setShowWhatSetsApart(false)}
      />
      <CheckoutModal
        isOpen={showCheckoutModal}
        plan={selectedPlan}
        onClose={() => {
          setShowCheckoutModal(false);
          setSelectedPlan(null);
        }}
      />
    </div>
  );
}
