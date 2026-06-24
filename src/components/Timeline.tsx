import { motion } from 'framer-motion';
import { Church, GlassWater, Utensils, Cake, Music, ChefHat, Moon } from 'lucide-react';

interface TimelineEvent {
    time: string;
    event: string;
    description: string;
    long_description: string;
    icon: string;
}

interface TimelineProps {
    data: {
        timeline: {
            title: string;
            events: TimelineEvent[];
        };
    };
}

const iconComponents = {
    church: <Church className="w-6 h-6" />,
    glass: <GlassWater className="w-6 h-6" />,
    utensils: <Utensils className="w-6 h-6" />,
    cake: <Cake className="w-6 h-6" />,
    music: <Music className="w-6 h-6" />,
    chefhat: <ChefHat className="w-6 h-6" />,
    moon: <Moon className="w-6 h-6" />
};

export default function Timeline({ data }: TimelineProps) {
    return (
        <section
            id="timeline"
            className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 bg-linear-to-tr from-surface to-primary/30 overflow-hidden"
        >
            <div className="w-full max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl text-center mb-16 md:mb-24 font-heading text-gray-800"
                >
                    {data.timeline.title}
                </motion.h2>

                <div className="relative">
                    {/* Horizontal Connector Line */}
                    <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-primary/30 hidden md:block">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-primary"
                        />
                    </div>

                    {/* Timeline Events Container */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 relative">
                        {data.timeline.events.map((event, index) => (
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
                                    className="z-10 bg-white border-2 border-primary text-primary w-16 h-16 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center shadow-md mb-8 transition-colors group-hover:bg-primary group-hover:text-white"
                                >
                                    <div className="mb-1">
                                        {iconComponents[event.icon as keyof typeof iconComponents] || iconComponents.church}
                                    </div>
                                    <span className="text-[10px] md:text-sm font-bold tracking-wider">{event.time}</span>
                                </motion.div>

                                {/* Content */}
                                <div className="px-4">
                                    <h3 className="text-xl md:text-2xl font-heading text-primary mb-2">
                                        {event.event}
                                    </h3>
                                    <p className="font-semibold text-base md:text-lg mb-2 text-secondary">
                                        {event.description}
                                    </p>
                                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-[250px] mx-auto ">
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

