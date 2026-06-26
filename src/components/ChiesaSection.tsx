import {motion, AnimatePresence} from 'framer-motion'
import {MapPinned, Navigation, X} from 'lucide-react'
import {useState} from 'react'
import {Map, MapControls, MapMarker, MarkerContent, MarkerPopup} from '@/components/ui/map'
import PhotoGallery from '@/components/PhotoGallery'

interface ChiesaSectionProps {
  data: {
    chiesa: {
      name: string
      address: string
      image_url: string
      google_maps_url: string
      description: string
      coordinates: [number, number]
      gallery: {
        imageUrl: string
        alt: string
      }[]
    }
  }
}

export default function ChiesaSection({data}: ChiesaSectionProps) {
  const [isMapOpen, setIsMapOpen] = useState(false)

  const locationCoordinates = data.chiesa.coordinates

  return (
    <section
      id="chiesa"
      className="relative h-[90vh] lg:h-screen w-full overflow-hidden flex items-center justify-around px-12 lg:px-26"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{scale: 1, y: 0}}
          animate={{scale: 1.05, y: -20}}
          transition={{duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'linear'}}
          className="w-full h-full"
        >
          <img
            src={data.chiesa.image_url}
            alt={data.chiesa.name}
            className="w-full h-full object-cover origin-center"
          />
        </motion.div>
        {/* Overlay for better readability - flipped gradient to right */}
        <div className="absolute inset-0 bg-black/40 lg:bg-black/30" />
        <div className="absolute inset-0 bg-linear-to-l from-black/60 via-black/20 to-transparent hidden lg:block" />
      </div>

      <div className="w-full relative z-10 flex justify-end">
        {/* Floating Card - Positioned on the right */}
        <motion.div
          initial={{opacity: 0, x: 100}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8, ease: 'easeOut'}}
          className="w-full max-w-xl bg-black/30 backdrop-blur-xl border border-white/30 p-8 lg:p-12 rounded-4xl shadow-2xl overflow-hidden relative"
        >
          {/* Decorative element - different color and position */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 blur-3xl -ml-20 -mb-20 rounded-full" />

          <div className="relative z-10">
            <motion.span
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              transition={{delay: 0.2}}
              className="text-primary font-medium tracking-[0.2em] italic text-sm lg:text-base mb-4 block"
            >
              La Nostra Cerimonia
            </motion.span>

            <motion.h2
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              transition={{delay: 0.3}}
              className="text-3xl lg:text-5xl lg:text-5xl font-heading text-white mb-6 leading-tight"
            >
              {data.chiesa.name}
            </motion.h2>

            <motion.p
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              transition={{delay: 0.4}}
              className="text-white/90 text-sm lg:text-lg mb-8 leading-relaxed font-light"
            >
              {data.chiesa.description}
            </motion.p>

            <motion.div
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              transition={{delay: 0.5}}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button
                onClick={() => setIsMapOpen(true)}
                className="group flex items-center gap-3 text-white transition-colors"
              >
                <div className="p-3 rounded-full bg-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <MapPinned className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs lg:text-sm text-white/70 block uppercase tracking-wider">
                    Indirizzo - mostra mappa
                  </span>
                  <span className="text-sm lg:text-base font-medium">{data.chiesa.address}</span>
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              transition={{delay: 0.6}}
            >
              <a
                href={data.chiesa.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
              >
                <Navigation className="w-4 h-4" />
                Naviga qui
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Photo Gallery - Positioned to the left */}
      {data.chiesa.gallery && data.chiesa.gallery.length > 0 && (
        <div className="absolute left-26 p-4 bg-linear-to-bl from-black/40 to-transparent z-10 hidden lg:block max-w-[40vw] rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
          <PhotoGallery
            images={data.chiesa.gallery}
            title="" // Vuoto per non avere il doppione del titolo
          />
        </div>
      )}

      {/* Map Modal */}
      <AnimatePresence>
        {isMapOpen && (
          <>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setIsMapOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-60"
            />
            <motion.div
              initial={{opacity: 0, scale: 0.9, y: 20}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.9, y: 20}}
              className="fixed inset-4 lg:inset-10 lg:inset-20 bg-white rounded-3xl shadow-2xl z-70 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl font-heading text-gray-800">{data.chiesa.name}</h3>
                  <p className="text-sm text-gray-500">{data.chiesa.address}</p>
                </div>
                <button
                  onClick={() => setIsMapOpen(false)}
                  className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 relative bg-gray-100">
                <Map center={locationCoordinates} zoom={15} theme="light" className="w-full h-full">
                  <MapControls showZoom showCompass showFullscreen />
                  <MapMarker longitude={locationCoordinates[0]} latitude={locationCoordinates[1]}>
                    <MarkerContent>
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse group-hover:bg-primary/40 transition-colors" />
                        <MapPinned
                          className="w-10 h-10 text-primary drop-shadow-2xl relative z-10"
                          fill="currentColor"
                        />
                      </div>
                    </MarkerContent>
                    <MarkerPopup closeButton>
                      <div className="p-2 min-w-[200px]">
                        <h4 className="font-heading text-lg mb-1 text-gray-800">La Cerimonia</h4>
                        <p className="text-sm text-gray-600 mb-2">{data.chiesa.address}</p>
                        <a
                          href={data.chiesa.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-semibold"
                        >
                          <Navigation className="w-4 h-4" />
                          Indicazioni stradali
                        </a>
                      </div>
                    </MarkerPopup>
                  </MapMarker>
                </Map>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
