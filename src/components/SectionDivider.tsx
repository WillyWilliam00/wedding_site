import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const SectionDivider: React.FC = () => {
    return (
        <div className="relative py-12 bg-surface flex items-center justify-center overflow-hidden">
            {/* Container for the decorative element and lines */}
            <div className="flex items-center w-full max-w-4xl px-4">

                {/* Left Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-px flex-1 bg-linear-to-r from-transparent via-primary to-primary origin-right"
                />

                {/* Center Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
                    className="mx-4 text-primary"
                >
                    <Sparkles size={24} strokeWidth={1.5} />
                </motion.div>

                {/* Right Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-px flex-1 bg-linear-to-l from-transparent via-primary to-primary origin-left"
                />
            </div>
        </div>
    );
};

export default SectionDivider;
