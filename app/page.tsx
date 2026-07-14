import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Discover from "@/components/sections/Discover";
import Solutions from "@/components/sections/Solutions";
import WhyChoose from "@/components/sections/WhyChoose";
import Process from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import Stats from "@/components/sections/Stats";
import Appointment from "@/components/sections/Appointment";
import Testimonials from "@/components/sections/Testimonials";
import Marquee from "@/components/sections/Marquee";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Discover />
        <Solutions />
        <WhyChoose />
        <Process />
        <Team />
        <Stats />
        <Appointment />
        <Testimonials />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
