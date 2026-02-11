import { motion } from 'framer-motion';
import { Church, GlassWater, Utensils } from 'lucide-react';

interface TimelineEvent {
    time: string;
    event: string;
    description: string;
    long_description: string;
    icon: string;
}

interface TimelineProps {
    data: {
        timeline: TimelineEvent[];
    };
}

const iconComponents = {
    church: <Church className="w-6 h-6" />,
    glass: <GlassWater className="w-6 h-6" />,
    utensils: <Utensils className="w-6 h-6" />,
};

export default function Timeline({ data }: TimelineProps) {
    return (
        <section
            id="timeline"
            className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 bg-light-ivory overflow-hidden"
        >
            <div className="w-full max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl text-center mb-24 font-heading"
                >
                    Timeline del Giorno
                </motion.h2>

                <div className="relative">
                    {/* Horizontal Connector Line */}
                    <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-satin-gold/30 hidden md:block">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-satin-gold"
                        />
                    </div>

                    {/* Timeline Events Container */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 relative">
                        {data.timeline.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="flex flex-col items-center text-center w-full md:w-1/3 group"
                            >
                                {/* Time Bubble */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="z-10 bg-white border-2 border-satin-gold text-satin-gold w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-md mb-8 transition-colors group-hover:bg-satin-gold group-hover:text-white"
                                >
                                    <div className="mb-1">
                                        {iconComponents[event.icon as keyof typeof iconComponents] || iconComponents.church}
                                    </div>
                                    <span className="text-sm font-bold tracking-wider">{event.time}</span>
                                </motion.div>

                                {/* Content */}
                                <div className="px-4">
                                    <h3 className="text-2xl font-heading text-satin-gold mb-2">
                                        {event.event}
                                    </h3>
                                    <p className="font-semibold text-lg mb-2 text-gray-800">
                                        {event.description}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed max-w-[250px] mx-auto ">
                                        {event.long_description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

