import HeroCarousel from "../components/HeroCarousel";
import About from "../components/About";
import OurServices from "../components/OurServices";
import Services from "../components/Services";
import Cafe from "../components/Cafe";
import Events from "../components/Events";
import Testimonial from "../components/Testimonial";
import ConactUs from "../components/ContactUs"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroCarousel />
      <About />
      <OurServices />
      <Services />
      <Cafe />
      <Events />
      <Testimonial />
      <ConactUs />
    </main>
  );
}
