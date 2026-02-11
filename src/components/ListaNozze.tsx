import { motion } from 'framer-motion';
import { Gift, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ListaNozzeProps {
    data: {
        registry: {
            title: string;
            message: string;
            iban: string;
            beneficiary: string;
        };
    };
}

export default function ListaNozze({ data }: ListaNozzeProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(data.registry.iban);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="lista-nozze"
            className="min-h-screen flex items-center justify-center px-6 py-20 bg-silk-white"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl w-full text-center"
            >
                <div className="w-20 h-20 bg-satin-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Gift className="w-10 h-10 text-satin-gold" />
                </div>

                <h2 className="text-4xl md:text-6xl mb-8 font-heading text-gray-800">
                    {data.registry.title}
                </h2>

                <p className="text-xl md:text-2xl mb-16 leading-relaxed font-heading font-normal text-gray-600 italic">
                    {data.registry.message}
                </p>

                <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-satin-gold/5 rounded-bl-full transition-transform group-hover:scale-110" />

                    <div className="relative z-10 space-y-10">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold mb-3">Intestatario</p>
                            <p className="text-2xl font-heading text-gray-800">{data.registry.beneficiary}</p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">IBAN</p>
                            <div className="relative group/iban">
                                <div className="text-xl md:text-3xl font-mono tracking-tighter p-6 rounded-2xl bg-gray-50 text-gray-700 break-all border border-gray-100 group-hover/iban:border-satin-gold/30 transition-all">
                                    {data.registry.iban}
                                </div>

                                <button
                                    onClick={handleCopy}
                                    className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95 bg-satin-gold min-w-[200px] justify-center"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Copiato!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5" />
                                            Copia IBAN
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
