import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Phone, ExternalLink, ArrowDownUp } from 'lucide-react';
import { useState, useMemo } from 'react';

interface AccommodationOption {
    name: string;
    type: string;
    address: string;
    distance: string;
    distance_km: number;
    price: string;
    price_val: number;
    price_range: string;
    phone: string;
    website: string;
}

interface AccommodationProps {
    data: {
        accommodation: {
            title: string;
            subtitle: string;
            options: AccommodationOption[];
        };
    };
}

export default function Accommodation({ data }: AccommodationProps) {
    const [sortBy, setSortBy] = useState<'distance_km' | 'price_val'>('distance_km');

    const sortedOptions = useMemo(() => {
        return [...data.accommodation.options].sort((a, b) => {
            return a[sortBy] - b[sortBy];
        });
    }, [sortBy, data.accommodation.options]);

    return (
        <section id="ospitalita" className="min-h-[60vh] px-6 py-20 bg-light-ivory">
            <div className="max-w-440 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl mb-4 font-heading text-gray-800">
                        {data.accommodation.title}
                    </h2>
                    <p className="text-lg text-gray-600 italic">{data.accommodation.subtitle}</p>
                </motion.div>

                {/* Sort Controls */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 mr-2 text-gray-400">
                        <ArrowDownUp className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest font-bold">Ordina per:</span>
                    </div>
                    <div className="flex bg-white p-1 rounded-full shadow-sm border border-gray-100">
                        <button
                            onClick={() => setSortBy('distance_km')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${sortBy === 'distance_km'
                                    ? 'bg-satin-gold text-white shadow-md'
                                    : 'text-gray-500 hover:text-satin-gold'
                                }`}
                        >
                            Vicinanza
                        </button>
                        <button
                            onClick={() => setSortBy('price_val')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${sortBy === 'price_val'
                                    ? 'bg-satin-gold text-white shadow-md'
                                    : 'text-gray-500 hover:text-satin-gold'
                                }`}
                        >
                            Costo
                        </button>
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {sortedOptions.map((option) => (
                            <motion.div
                                key={option.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col group overflow-hidden"
                            >
                                <div className="p-1">
                                    <div className="bg-gray-50 h-32 flex items-center justify-center rounded-t-lg relative">
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold text-satin-gold">
                                            {option.type}
                                        </div>
                                        <div className="text-4xl font-heading text-gray-200 group-hover:text-satin-gold/20 transition-colors uppercase tracking-widest px-4 text-center">
                                            {option.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl mb-4 font-heading text-gray-800 line-clamp-1">
                                        {option.name}
                                    </h3>

                                    <div className="space-y-3 mb-6 flex-1 text-sm">
                                        <div className="text-gray-500 flex items-start gap-2">
                                            <MapPin className="w-4 h-4 shrink-0 text-satin-gold" />
                                            <span>{option.address}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className={`flex items-center gap-2 ${sortBy === 'distance_km' ? 'text-satin-gold font-bold' : ''}`}>
                                                <Navigation className="w-4 h-4 shrink-0" />
                                                <span className="font-medium">{option.distance}</span>
                                            </div>
                                            <div className={`flex items-center gap-1 ${sortBy === 'price_val' ? 'text-satin-gold font-bold' : ''}`}>
                                                <span className={`${sortBy === 'price_val' ? 'text-satin-gold/60' : 'text-gray-400'}`}>{option.price_range}</span>
                                                <span className="text-gray-900">{option.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
                                        <a
                                            href={`tel:${option.phone}`}
                                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                                        >
                                            <Phone className="w-3.5 h-3.5" />
                                            Chiama
                                        </a>

                                        <a
                                            href={option.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-satin-gold text-white hover:bg-satin-gold/90 transition-colors text-sm font-medium"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Sito
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
