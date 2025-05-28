import { useState } from "react";
import ProfileMainContent from "../components/ProfilePageComponents/ProfileMainContent";
import NavbarHomePage from "../components/HomePageComponents/NavbarHomePage";
import Footer from "../components/ProfilePageComponents/ProfileFooter";
const TABS = [
  "About",
  "Skills Offered",
  "Skills Wanted",
  "Reviews",
  "Activity",
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("About");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarHomePage />

      {/* Main content area */}
      <main className="flex-1">
        {/* Profile Header */}
        <ProfileMainContent activeTab={activeTab} />         
      </main>
      {/* You can add your Footer here */}
      <Footer />
    </div>
  );
}