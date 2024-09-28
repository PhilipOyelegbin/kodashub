import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Features from "./services/_components/Features";

export default function HomePage() {
  return (
    <article>
      <Hero />
      <Features />
      <Services />
      <Testimonials />
    </article>
  );
}
