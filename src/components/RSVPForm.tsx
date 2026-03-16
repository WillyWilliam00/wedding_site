import { useForm } from '@tanstack/react-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Send, Mail, Phone, Plus, Minus, Trash2 } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface GuestEntry {
    name: string;
    surname: string;
    allergens: string[];
    otherAllergen: string;
    showOther: boolean;
}

interface RSVPFormProps {
    data: {
        rsvp: {
            title: string;
            subtitle: string;
            fields: {
                name: string;
                surname: string;
            };
            allergens: {
                title: string;
                subtitle: string;
                options: string[];
                other: {
                    label: string;
                    placeholder: string;
                };
            };
            submit_button: string;
            success_message: string;
        };
        contact: {
            title: string;
            email: string;
            phone: string;
        };
    };
}

const makeGuest = (): GuestEntry => ({
    name: '',
    surname: '',
    allergens: [],
    otherAllergen: '',
    showOther: false,
});

export default function RSVPForm({ data }: RSVPFormProps) {
    // 1. Inizializzazione del FORM con TanStack Form
    const form = useForm({
        defaultValues: {
            guests: [makeGuest()] as GuestEntry[],
        },
        onSubmit: async ({ value }) => {
            console.log('Dati inviati:', value);
            alert(data.rsvp.success_message);
        },
    });

    return (
        <section id="rsvp" className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 py-20 bg-surface">
            {/* Contatti */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl w-full mb-12">
                <h3 className="text-xl md:text-2xl font-heading text-gray-800 text-center mb-6">{data.contact.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-center gap-3 bg-white/50 border border-primary/10 p-4 rounded-xl shadow-sm">
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="text-sm md:text-base font-medium text-gray-700 italic">{data.contact.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 bg-white/50 border border-primary/10 p-4 rounded-xl shadow-sm">
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="text-sm md:text-base font-medium text-gray-700 italic">{data.contact.phone}</span>
                    </div>
                </div>
            </motion.div>

            {/* Card del Form */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-14 border border-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary/20 via-primary to-primary/20" />
                
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-4xl md:text-5xl text-center mb-4 font-heading text-gray-800 tracking-tight">{data.rsvp.title}</h2>
                    <p className="text-center text-sm md:text-base text-gray-400 max-w-md italic leading-relaxed">{data.rsvp.subtitle}</p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-8"
                >
                    {/* 2. Gestione degli Ospiti come Array Field */}
                    <form.Field name="guests" mode="array">
                        {(guestsField) => (
                            <div className="space-y-8">
                                {/* Controllo numero ospiti */}
                                <div className="flex items-center justify-between bg-gray-50/80 border border-gray-100 rounded-2xl px-6 py-5">
                                    <div className="hidden sm:block">
                                        <p className="text-sm font-bold text-gray-700">Ospiti totali</p>
                                        <p className="text-xs text-gray-400">Aggiungi i membri del tuo gruppo</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white p-1 rounded-full border border-gray-200 shadow-sm mx-auto sm:mx-0">
                                        <button
                                            type="button"
                                            onClick={() => guestsField.removeValue(guestsField.state.value.length - 1)}
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-20"
                                            disabled={guestsField.state.value.length <= 1}
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="w-8 text-center text-2xl font-bold font-heading text-primary">{guestsField.state.value.length}</span>
                                        <button
                                            type="button"
                                            onClick={() => guestsField.pushValue(makeGuest())}
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-20"
                                            disabled={guestsField.state.value.length >= 10}
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Lista Dinamica degli Ospiti */}
                                <div className="space-y-6">
                                    <AnimatePresence mode="popLayout">
                                        {guestsField.state.value.map((_, i) => (
                                            <motion.div
                                                key={`guest-${i}`}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 relative group"
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary italic">#{i + 1}</div>
                                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Ospite</span>
                                                    </div>
                                                    {guestsField.state.value.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => guestsField.removeValue(i)}
                                                            className="text-gray-300 hover:text-red-400 transition-colors p-1"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* 3. Nested Fields per ogni proprietà dell'ospite */}
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <form.Field name={`guests[${i}].name`}>
                                                        {(field) => (
                                                            <div className="space-y-1.5">
                                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{data.rsvp.fields.name} *</label>
                                                                    <input
                                                                        id={field.name}
                                                                        name={field.name}
                                                                        value={field.state.value ?? ''}
                                                                        onBlur={field.handleBlur}
                                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                                        className="w-full bg-white border-b-2 border-gray-100 px-1 py-2 text-gray-800 focus:border-primary outline-none transition-colors placeholder:text-gray-200"
                                                                        placeholder="es. Giulia"
                                                                        required
                                                                    />
                                                            </div>
                                                        )}
                                                    </form.Field>

                                                    <form.Field name={`guests[${i}].surname`}>
                                                        {(field) => (
                                                            <div className="space-y-1.5">
                                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{data.rsvp.fields.surname} *</label>
                                                                    <input
                                                                        id={field.name}
                                                                        name={field.name}
                                                                        value={field.state.value ?? ''}
                                                                        onBlur={field.handleBlur}
                                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                                        className="w-full bg-white border-b-2 border-gray-100 px-1 py-2 text-gray-800 focus:border-primary outline-none transition-colors placeholder:text-gray-200"
                                                                        placeholder="es. Bianchi"
                                                                        required
                                                                    />
                                                            </div>
                                                        )}
                                                    </form.Field>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <ChefHat className="w-4 h-4 text-primary" />
                                                        <span className="text-xs font-bold uppercase tracking-widest">{data.rsvp.allergens.title}</span>
                                                    </div>

                                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {data.rsvp.allergens.options.map((opt) => (
                                                            <form.Field name={`guests[${i}].allergens`} key={opt}>
                                                                {(field) => (
                                                                    <label className="flex items-center gap-3 cursor-pointer group select-none bg-white/50 p-3 rounded-xl border border-transparent hover:border-primary/10 transition-all">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={(field.state.value ?? []).includes(opt)}
                                                                            onChange={() => {
                                                                                const current = (field.state.value ?? []);
                                                                                field.handleChange(
                                                                                    current.includes(opt) 
                                                                                        ? current.filter(o => o !== opt) 
                                                                                        : [...current, opt]
                                                                                );
                                                                            }}
                                                                            className="w-4 h-4 rounded-md border-gray-300 text-primary focus:ring-primary accent-primary"
                                                                        />
                                                                        <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{opt}</span>
                                                                    </label>
                                                                )}
                                                            </form.Field>
                                                        ))}

                                                        <form.Field name={`guests[${i}].showOther`}>
                                                            {(field) => (
                                                                <label className="flex items-center gap-3 cursor-pointer group select-none bg-white p-3 rounded-xl border border-primary/5 hover:border-primary transition-all">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={field.state.value ?? false}
                                                                        onChange={(e) => field.handleChange(e.target.checked)}
                                                                        className="w-4 h-4 rounded-md border-gray-300 text-primary accent-primary"
                                                                    />
                                                                    <span className="text-xs font-bold text-primary uppercase tracking-tighter">{data.rsvp.allergens.other.label}</span>
                                                                </label>
                                                            )}
                                                        </form.Field>
                                                    </div>

                                                    {/* Textarea Altro condizionale */}
                                                    <form.Field name={`guests[${i}].showOther`}>
                                                        {(showOtherField) => (
                                                            <AnimatePresence>
                                                                {showOtherField.state.value && (
                                                                    <form.Field name={`guests[${i}].otherAllergen`}>
                                                                        {(otherField) => (
                                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                                                <textarea
                                                                                    id={otherField.name}
                                                                                    value={otherField.state.value ?? ''}
                                                                                    onChange={(e) => otherField.handleChange(e.target.value)}
                                                                                    placeholder={data.rsvp.allergens.other.placeholder}
                                                                                    className="w-full mt-2 p-4 rounded-2xl bg-white border border-gray-100 text-xs text-gray-700 outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none shadow-inner"
                                                                                    rows={3}
                                                                                />
                                                                            </motion.div>
                                                                        )}
                                                                    </form.Field>
                                                                )}
                                                            </AnimatePresence>
                                                        )}
                                                    </form.Field>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </form.Field>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-bold text-base shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] hover:shadow-2xl bg-primary active:scale-95 group"
                    >
                        <span className="group-hover:translate-x-1 transition-transform">
                            {data.rsvp.submit_button}
                        </span>
                        <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                </form>
            </motion.div>

        </section>
    );
}
