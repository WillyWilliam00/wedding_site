import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ChiSiamo from './components/ChiSiamo';
import Timeline from './components/Timeline';
import LocationMenu from './components/LocationMenu';
import Accommodation from './components/Accommodation';
import DressCode from './components/DressCode';
import ListaNozze from './components/ListaNozze';
import FAQ from './components/FAQ';
import RSVPForm from './components/RSVPForm';
import SectionDivider from './components/SectionDivider';
import weddingData from './config/wedding_data.json';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from './lib/utils';

function App() {

  const [isHeroSectionInView, setIsHeroSectionInView] = useState(false);
  const heroData = {
    couple_names: weddingData.content.couple_names,
    hero: weddingData.content.hero,
    wedding_date: weddingData.content.wedding_date,
  };

  const navbarData = {
    navbar: weddingData.content.navbar,
    couple_names: weddingData.content.couple_names,
  };

  const sectionToShow: Array<string> = weddingData.content.navbar.links.map((link) => link.label);

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

        console.log(Math.abs(page.top) >= window.innerHeight)
        setIsHeroSectionInView(Math.abs(page.top) >= window.innerHeight / 2)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="min-h-screen ">
      <Navbar data={navbarData} />


     {sectionToShow.includes('Home') && <> <HeroSection data={heroData} /> <SectionDivider /> </> }


      {sectionToShow.includes('Chi Siamo') && <> <ChiSiamo data={{ chi_siamo: weddingData.content.chi_siamo }} /> <SectionDivider /> </>}

      {sectionToShow.includes('Timeline') && <> <Timeline data={{ timeline: weddingData.content.timeline }} /> <SectionDivider /> </>}

      {sectionToShow.includes('Location') && <> <LocationMenu
        data={{
          location: {
            ...weddingData.content.location,
            coordinates: weddingData.content.location.coordinates as [number, number],
          },
          menu: weddingData.content.menu,
        }}
      /> <SectionDivider /> </>}
      {sectionToShow.includes('Dress Code') && <> <DressCode data={{ dress_code: weddingData.content.dress_code }} /> <SectionDivider /> </>}

      {sectionToShow.includes('Ospitalità') && <> <Accommodation data={{ accommodation: weddingData.content.accommodation }} /> <SectionDivider /> </>}

      {sectionToShow.includes('Lista Nozze') && <> <ListaNozze data={{ registry: weddingData.content.registry }} /> <SectionDivider /> </>}

      {sectionToShow.includes('RSVP') && <> <RSVPForm data={{ rsvp: weddingData.content.rsvp, contact: weddingData.content.contact }} /> <SectionDivider /> </>}

      {sectionToShow.includes('FAQ') && <> <FAQ data={{ faq: weddingData.content.faq }} /> <SectionDivider /> </>}
      <Footer />
      <button onClick={handleScrollToTop} className={cn(isHeroSectionInView ? 'opacity-100' : 'opacity-0 pointer-events-none', 'rounded-full p-4 border border-satin-gold bg-silk-white hover:bg-satin-gold hover:text-silk-white transition-all cursor-pointer group   fixed bottom-2 right-2 z-50')}>
        <ArrowUp className='w-6 h-6 text-satin-gold group-hover:text-silk-white' />
      </button>
    </div>
  );
}

export default App;

