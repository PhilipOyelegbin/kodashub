import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";

export default function Home() {
  return (
    <article>
      <Hero />
      <Features />
      <Services />
      <Testimonials />
    </article>
  );
}
