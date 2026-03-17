import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ChiSiamo from './components/ChiSiamo';
import Timeline from './components/Timeline';
import ChiesaSection from './components/ChiesaSection';
import LocationMenu from './components/LocationMenu';
import Accommodation from './components/Accommodation';
import ListaNozze from './components/ListaNozze';
import FAQ from './components/FAQ';
import RSVPForm from './components/RSVPForm';
import SectionDivider from './components/SectionDivider';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from './lib/utils';
import { useUnifiedWeddingData } from './hooks/useUnifiedWeddingData';

function App() {
  const [isHeroSectionInView, setIsHeroSectionInView] = useState(false);
  const { activeData } = useUnifiedWeddingData();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const page = heroSection.getBoundingClientRect()
        setIsHeroSectionInView(Math.abs(page.top) >= window.innerHeight / 2)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (

    <div className="min-h-screen">
      <Navbar data={{ navbar: activeData.navbar, couple_names: activeData.couple_names }} />

      <HeroSection data={{ hero: activeData.hero, couple_names: activeData.couple_names, wedding_date: activeData.wedding_date }} />

      <div className="relative z-10 bg-background">
        <SectionDivider />

        <ChiSiamo data={{ chi_siamo: activeData.chi_siamo }} />
        <SectionDivider />

        <Timeline data={{ timeline: activeData.timeline }} />
        <SectionDivider />

        <ChiesaSection data={{ chiesa: activeData.chiesa }} />
        <SectionDivider />

        <LocationMenu
          data={{
            location: activeData.location,
            menu: activeData.menu,
            gallery: activeData.gallery,
          }}
        />
        <SectionDivider />

        {/* <DressCode data={{ dress_code: activeData.dress_code }} />
      <SectionDivider /> */}

        <Accommodation data={{ accommodation: activeData.accommodation }} />
        <SectionDivider />

        <ListaNozze data={{ listaNozze: activeData.listaNozze }} />
        <SectionDivider />

        <RSVPForm data={{ rsvp: activeData.rsvp, contact: activeData.contact }} />
        <SectionDivider />

        <FAQ data={{ faq: activeData.faq }} />
        <SectionDivider />

        <Footer data={{ footer: activeData.footer, couple_names: activeData.couple_names }} />
      </div>
      <button
        onClick={handleScrollToTop}
        className={cn(
          isHeroSectionInView ? 'opacity-100' : 'opacity-0 pointer-events-none',
          'rounded-full p-4 border border-primary bg-background hover:bg-primary hover:text-background transition-all cursor-pointer group fixed bottom-2 right-2 z-50'
        )}
      >
        <ArrowUp className="w-6 h-6 text-primary group-hover:text-background" />
      </button>
    </div>

  );
}

export default App;

