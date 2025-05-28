import Navbar from "../components/LandingPageComponents/NavbarLandingPage" 
import Hero from "../components/LandingPageComponents/Hero";
import Features from "../components/LandingPageComponents/Features"; 
import HowItWorks from "../components/LandingPageComponents/HowItWorks";
import Skills from "../components/LandingPageComponents/Skills"
import Testimonials from "../components/LandingPageComponents/Testimonials";
import CTA from "../components/LandingPageComponents/Cta";
import Newsletter from "../components/LandingPageComponents/NewsLetter";
import Footer from "../components/LandingPageComponents/FooterLandingPage";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Skills />
      <Testimonials />
      <CTA />
      <Newsletter />
      <Footer />
    </div>
  );
}
