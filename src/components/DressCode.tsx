import { motion } from 'framer-motion';
import { Shirt, Palette } from 'lucide-react';

interface DressCodeProps {
    data: {
        dress_code: {
            title: string;
            code: string;
            description: string;
            palette_label: string;
            avoid_label: string;
            suggested_colors: Array<{
                name: string;
                hex: string;
            }>;
            avoid_colors: string[];
        };
    };
}

export default function DressCode({ data }: DressCodeProps) {
    return (
        <section id="dress-code"
            className="min-h-screen flex items-center justify-center px-6 py-24 bg-surface"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="max-w-312 w-full bg-white rounded-lg shadow-xl p-8 md:p- border border-gray-100 relative overflow-hidden"
            >
                {/* Decorative Icon */}
                <div className="absolute top-0 right-0 p-8 text-gray-50">
                    <Shirt className="w-32 h-32 rotate-12" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <Shirt className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="text-3xl md:text-5xl text-center mb-8 font-heading text-gray-800">
                        {data.dress_code.title}
                    </h2>

                    <div className="text-center text-xs lg:text-2xl md:text-3xl mb-8 py-2 md:py-6 px-10 rounded-2xl font-heading bg-surface text-primary border border-primary/10 shadow-inner">
                        {data.dress_code.code}
                    </div>

                    <p className="text-center text-xs lg:text-lg text-gray-600 mb-12 max-w-2xl leading-relaxed italic">
                        {data.dress_code.description}
                    </p>

                    {/* Suggested Colors Palette */}
                    <div className="w-full mb-12">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <Palette className="w-5 h-5 text-primary" />
                            <h3 className="text-xs font-bold text-gray-800">{data.dress_code.palette_label}</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {data.dress_code.suggested_colors.map((color, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className="w-9 h-9 md:w-20 md:h-20 rounded-full shadow-lg mb-3 border-4 border-white transition-transform hover:scale-110 duration-300"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <span className="text-xs md:text-sm font-bold text-gray-700  uppercase">{color.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Colors to Avoid */}
                    <div className="w-full text-center border-t border-gray-100 pt-8">
                        <p className="text-gray-500">
                            <span className="font-bold text-red-400 uppercase text-xs md:text-sm tracking-widest block mb-2">{data.dress_code.avoid_label}</span>{' '}
                            <span className="text-base md:text-lg text-gray-700 font-medium italic">
                                {data.dress_code.avoid_colors.join(', ')}
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
