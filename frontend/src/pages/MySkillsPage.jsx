import React from "react";
import NavbarHomePage from "../components/HomePageComponents/NavbarHomePage";
import Footer from "../components/ProfilePageComponents/ProfileFooter";
import SkillsLearnSection from "../components/QuizPageComponents/SkillsLearnSection"

export default function MySkillsPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <NavbarHomePage />
      <main className="flex-1">
        <SkillsLearnSection />
      </main>
      <Footer />
    </div>
  );
}