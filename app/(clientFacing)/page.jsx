import Hero from "../components/Hero";
import Features from "../components/Features";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

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
