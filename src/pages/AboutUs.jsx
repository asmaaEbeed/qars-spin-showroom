import HeroSection from "../components/about-us/HeroSection";
import AboutSection from "../components/about-us/AboutSection";
import ServicesSection from "../components/about-us/ServicesSection";
import JourneySection from "../components/about-us/JourneySection";
import WhyChooseUs from "../components/about-us/WhyChooseUs";
import CTASection from "../components/about-us/CTASection";
import StatsSection from "../components/about-us/StatsSection";
import Footer from "../components/common/Footer";


const AboutUs = () => {
  return (
    <>

      <main className="bg-white overflow-x-hidden">

        <HeroSection />
        <StatsSection />
        <AboutSection />

        <ServicesSection />

        <JourneySection />

        <WhyChooseUs />

        <CTASection />

      </main>
      <Footer />
    </>
  );
}

export default AboutUs