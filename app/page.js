import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Testimonials from "./_components/Testimonials";
import Services from "./_components/Services";

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
