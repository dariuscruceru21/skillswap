import NavbarHomePage from "../components/HomePageComponents/NavbarHomePage";
import Content from "../components/HomePageComponents/Content";
import Pagination from "../components/HomePageComponents/Pagination";
import HomePageFooter from "../components/HomePageComponents/HomePageFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarHomePage />
      <main className="flex-1">
        <Content />
        <Pagination />
      </main>
      <HomePageFooter />
    </div>
  );
}
