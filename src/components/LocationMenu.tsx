import { motion, AnimatePresence } from 'framer-motion';
import { MapPinned, UtensilsCrossed, X, Navigation } from 'lucide-react';
import { useState } from 'react';
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from '@/components/ui/map';
import PhotoGallery from '@/components/PhotoGallery';

interface LocationMenuProps {
    data: {
        location: {
            name: string;
            address: string;
            image_url: string;
            google_maps_url: string;
            description: string;
            coordinates: [number, number];
        };
        gallery: {
            imageUrl: string;
            alt: string;
        }[];
        menu: {
            title: string;
            sections: Array<{
                name: string;
                items: string[];
            }>;
        };
    };
}

export default function LocationMenu({ data }: LocationMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);


    const locationCoordinates = data.location.coordinates;


    return (
        <section id="location" className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-around m px-6">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    className="w-full h-full"
                >
                    <img
                        src={data.location.image_url}
                        alt={data.location.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black/40 md:bg-black/20" />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent hidden md:block" />
            </div>

            <div className="max-w-7xl  w-full relative z-10">
                {/* Floating Card */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden relative"
                >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16 rounded-full" />

                    <div className="relative z-10">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-primary font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block"
                        >
                            La Nostra Scelta
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-heading text-white mb-6 leading-tight"
                        >
                            {data.location.name}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-white/80 text-base md:text-lg mb-8 leading-relaxed font-light"
                        >
                            {data.location.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <button
                                onClick={() => setIsMapOpen(true)}
                                className="group flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                            >
                                <div className="p-3 rounded-full bg-white/20 group-hover:bg-primary transition-all duration-300">
                                    <MapPinned className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <span className="text-xs md:text-sm text-white/50 block uppercase tracking-wider">Indirizzo - mostra mappa</span>
                                    <span className="text-xs md:text-sm font-medium">{data.location.address}</span>
                                </div>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg"
                            >
                                <UtensilsCrossed className="w-4 h-4" />
                                Scopri il Menu
                            </button>
                            <a
                                href={data.location.google_maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                            >
                                <Navigation className="w-4 h-4" />
                                Naviga qui
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Photo Gallery (Optional: Could be moved or triggered by a button too) */}
            {data.gallery.length > 0 && <div className=" p-4 bg-linear-to-br from-surface/50 to-gradient-end/50 z-10 hidden lg:block max-w-4xl rounded-3xl shadow-2xl shadow-primary/20">
                <PhotoGallery
                    images={data.gallery}
                />
            </div>}

            {/* Map Modal */}
            <AnimatePresence>
                {isMapOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMapOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-60"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-3xl shadow-2xl z-70 overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <div>
                                    <h3 className="text-2xl font-heading text-gray-800">{data.location.name}</h3>
                                    <p className="text-sm text-gray-500">{data.location.address}</p>
                                </div>
                                <button
                                    onClick={() => setIsMapOpen(false)}
                                    className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>
                            <div className="flex-1 relative bg-gray-100">
                                <Map
                                    center={locationCoordinates}
                                    zoom={15}
                                    theme='light'
                                    className="w-full h-full"
                                >
                                    <MapControls showZoom showCompass showFullscreen />
                                    <MapMarker
                                        longitude={locationCoordinates[0]}
                                        latitude={locationCoordinates[1]}
                                    >
                                        <MarkerContent>
                                            <div className="relative group">
                                                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse group-hover:bg-primary/40 transition-colors" />
                                                <MapPinned className="w-10 h-10 text-primary drop-shadow-2xl relative z-10" fill="currentColor" />
                                            </div>
                                        </MarkerContent>
                                        <MarkerPopup closeButton>
                                            <div className="p-2 min-w-[200px]">
                                                <h4 className="font-heading text-lg mb-1 text-gray-800">Ci vediamo qui!</h4>
                                                <p className="text-sm text-gray-600 mb-2">{data.location.address}</p>
                                                <a
                                                    href={data.location.google_maps_url}
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

            {/* Menu Modal */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-60"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-70 overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-background">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-heading text-gray-900">
                                        {data.menu.title}
                                    </h2>
                                    <div className="w-20 h-1 bg-primary mt-4 rounded-full" />
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-3 rounded-full hover:bg-gray-100 transition-colors group"
                                >
                                    <X className="w-8 h-8 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-linear-to-b from-background to-white">
                                <div className="max-w-4xl mx-auto">
                                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                                        {data.menu.sections.map((section, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <h3 className="text-2xl md:text-3xl font-heading text-primary mb-8 flex items-center gap-4">
                                                    <span className="w-8 h-px bg-primary/30" />
                                                    {section.name}
                                                    <span className="flex-1 h-px bg-primary/30" />
                                                </h3>
                                                <ul className="space-y-6">
                                                    {section.items.map((item, itemIndex) => (
                                                        <li
                                                            key={itemIndex}
                                                            className="text-gray-700 flex flex-col group"
                                                        >
                                                            <div className="flex items-start gap-4">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2.5 group-hover:bg-primary transition-colors" />
                                                                <span className="text-lg leading-relaxed">{item}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-20 text-center">
                                        <p className="font-heading text-xl italic text-gray-400">
                                            Buon Appetito
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
