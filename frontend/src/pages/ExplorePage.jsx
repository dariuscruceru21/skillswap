import NavbarHomePage from "../components/HomePageComponents/NavbarHomePage";
import Pagination from "../components/HomePageComponents/Pagination";
import HomePageFooter from "../components/HomePageComponents/HomePageFooter";
import ExploreContent from "../components/ExplorePageComponents/ExploreContent";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarHomePage />
      <main className="flex-1">
        <ExploreContent />
        <Pagination />
      </main>
      <HomePageFooter />
    </div>
  );
}