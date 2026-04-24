import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedWork from "@/components/sections/FeaturedWork";
import MoreProjects from "@/components/sections/MoreProjects";
import ResumeBlock from "@/components/sections/ResumeBlock";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <FeaturedWork />
        <MoreProjects />
        <ResumeBlock />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
