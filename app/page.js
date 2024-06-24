import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Testimonials from "./_components/Testimonials";
import Pricing from "./_components/Pricing";

export default function Home() {
  return (
    <article>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
    </article>
  );
}
