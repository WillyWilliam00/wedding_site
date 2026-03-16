import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
    data: {
        navbar: {
            links: Array<{
                label: string;
                href: string;
            }>;
        };
        couple_names: {
            groom: string;
            bride: string;
        };
    };
}

export default function Navbar({ data }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMobileOpen(false);
    };

    const groomFirst = data.couple_names.groom.split(' ')[0];
    const brideFirst = data.couple_names.bride.split(' ')[0];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo / Couple Names */}
                <a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
                    className={`font-heading text-xl md:text-2xl font-semibold transition-colors duration-500 ${isScrolled ? 'text-primary' : 'text-white'
                        }`}
                >
                    {groomFirst} & {brideFirst}
                </a>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {data.navbar.links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:text-primary ${isScrolled ? 'text-gray-700' : 'text-white/90'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className={`lg:hidden p-2 rounded-md transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'
                        }`}
                    aria-label="Toggle menu"
                >
                    {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>


            {isMobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md shadow-lg"
                >
                    <div className="px-6 py-4 space-y-1">
                        {data.navbar.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                onClick={() => { handleLinkClick(link.href); }}
                                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-surface hover:text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}

        </nav>
    );
}
