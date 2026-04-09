import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceCards from "@/components/ServiceCards";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-navy">
      <Navbar />
      <HeroSection />
      <ServiceCards />
      <ContactForm />
      <Footer />
    </main>
  );
}
