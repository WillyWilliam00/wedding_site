import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
    data: {
        couple_names: {
            groom: string;
            bride: string;
        };
        hero: {
            tagline: string;
            image_url: string;
        };
        wedding_date: string;
    };
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
    const difference = +new Date(targetDate) - +new Date();

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export default function HeroSection({ data }: HeroSectionProps) {
    const { couple_names, hero, wedding_date } = data;
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(wedding_date));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(wedding_date));
        }, 1000);

        return () => clearInterval(timer);
    }, [wedding_date]);

    return (
        <section id="hero" className="relative w-full h-dvh overflow-hidden flex flex-col">
            {/* Background Image & Vignette */}
            <div className="absolute inset-0 z-0">
                <img
                    src={hero.image_url}
                    alt="Wedding Hero"
                    className="w-full h-full object-cover"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%]" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Central Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-silk-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] tracking-tighter">
                        {couple_names.groom.split(' ')[0]}
                        <span className="inline-block mx-4 md:mx-8 scale-75 md:scale-90 align-middle text-satin-gold">&</span>
                        {couple_names.bride.split(' ')[0]}
                    </h1>
                    <div className="mt-6 md:mt-8 flex items-center justify-center gap-4 md:gap-8">
                        <span className="w-12 md:w-24 h-px bg-satin-gold/40" />
                        <span className="text-xl md:text-3xl text-silk-white/90 italic font-heading tracking-widest drop-shadow-md">
                            {hero.tagline}
                        </span>
                        <span className="w-12 md:w-24 h-px bg-satin-gold/40" />
                    </div>
                </motion.div>
            </div>

            {/* Floating Countdown Bar (Bottom) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 w-full flex justify-end pb-12 pe-12"
            >
                <div className="bg-silk-white/10 backdrop-blur-md border border-satin-gold/20 rounded-2xl px-8 py-4 md:py-6 shadow-2xl flex gap-8 md:gap-16">
                    {[
                        { value: timeLeft.days, label: 'Giorni' },
                        { value: timeLeft.hours, label: 'Ore' },
                        { value: timeLeft.minutes, label: 'Minuti' },
                        { value: timeLeft.seconds, label: 'Secondi' }
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col items-center">
                            <span className="text-2xl md:text-4xl font-bold text-satin-gold font-body drop-shadow-sm">
                                {String(item.value).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-silk-white/70 mt-1 font-medium">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
