import React from "react";
import Navbar from "../Navbar.jsx";
import HeroSection from "../HeroSection.jsx";
import FeaturesSection from "../FeaturesSection.jsx";
import RecommendedSection from "../RecommendedSection.jsx";
import ContactSection from "../ContactSection.jsx";
import _Footer_new from "../_Footer_new.jsx";
function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <RecommendedSection />
      <ContactSection />
      <_Footer_new/>
      
    </div>
  );
}

export default LandingPage;
