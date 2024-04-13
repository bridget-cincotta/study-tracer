import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import NavBar from "@/components/landing_page/navbar";
import Hero from "@/components/landing_page/hero";
import Partners from "@/components/landing_page/partners";
import Pricing from "@/components/landing_page/pricing";
import Faq from "@/components/landing_page/faq";
import Footer from "@/components/landing_page/footer";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main>
        <Hero />
        <Partners />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
