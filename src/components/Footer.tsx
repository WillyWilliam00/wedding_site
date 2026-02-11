import { motion } from 'framer-motion';
import weddingData from '../config/wedding_data.json';
import { ExternalLink } from 'lucide-react';

// Utility function to get initials
const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    return parts[0]?.[0]?.toUpperCase() || '';
};

const Footer = () => {
    const { footer, couple_names } = weddingData.content;

    // Get initials from couple names
    const groomInitial = getInitials(couple_names.groom);
    const brideInitial = getInitials(couple_names.bride);

    return (
        <footer className="relative bg-linear-to-b from-(--gradient-start) to-white py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    className="flex flex-col items-center justify-center gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Initials with decorative lines */}
                    <div className="flex items-center gap-6 w-full max-w-md">
                        <div className="flex-1 h-px bg-linear-to-r from-transparent via-satin-gold to-satin-gold opacity-40" />
                        <motion.div
                            className="font-heading text-2xl tracking-[0.3em] text-satin-gold opacity-60"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 0.6, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {groomInitial}&{brideInitial}
                        </motion.div>
                        <div className="flex-1 h-px bg-linear-to-l from-transparent via-satin-gold to-satin-gold opacity-40" />
                    </div>

                    {/* Created with love text */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-satin-gold opacity-50 font-body">
                            Creato con amore per {couple_names.groom} & {couple_names.bride} • {footer.year}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
                <a className="flex items-center justify-center gap-2 text-xs md:text-sm tracking-[0.2em] uppercase  opacity-50 font-body" href="https://williamcosta.dev" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-6 h-6 text-satin-gold" />
                    By William Costa
                </a>
            </div>
        </footer>
    );
};

export default Footer;
