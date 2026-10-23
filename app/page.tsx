import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import FeaturedWork from "@/components/sections/FeaturedWork";
import MoreProjects from "@/components/sections/MoreProjects";
import ResumeBlock from "@/components/sections/ResumeBlock";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <FeaturedWork />
        <About />
        <MoreProjects />
        <ResumeBlock />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
