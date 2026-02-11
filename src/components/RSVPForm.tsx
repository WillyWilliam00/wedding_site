import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Calendar, ChefHat, CheckCircle2, Send, Mail, Phone } from 'lucide-react';

interface RSVPFormProps {
    data: {
        rsvp: {
            title: string;
            subtitle: string;
            fields: {
                name: string;
                surname: string;
                attendance: {
                    label: string;
                    options: string[];
                };
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
            error_message: string;
        };
        contact: {
            title: string;
            email: string;
            phone: string;
        };
    };
}

export default function RSVPForm({ data }: RSVPFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        attendance: '',
        allergens: [] as string[],
        otherAllergen: '',
        showOtherField: false,
    });

    const handleAllergenChange = (allergen: string) => {
        if (allergen === data.rsvp.allergens.other.label) {
            setFormData({
                ...formData,
                showOtherField: !formData.showOtherField,
                otherAllergen: formData.showOtherField ? '' : formData.otherAllergen,
            });
        } else {
            const updatedAllergens = formData.allergens.includes(allergen)
                ? formData.allergens.filter((a) => a !== allergen)
                : [...formData.allergens, allergen];
            setFormData({ ...formData, allergens: updatedAllergens });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert(data.rsvp.success_message);
    };

    return (
        <section
            id="rsvp"
            className="h-min-[70vh] flex flex-col items-center justify-center gap-6 px-6 py-20 bg-light-ivory"
        >
            {/* Contact Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full mb-12"
            >
                <h3 className="text-2xl font-heading text-gray-800 text-center mb-6">{data.contact.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-center gap-2 bg-satin-gold/10 p-4 rounded-lg">
                        <Mail className="w-6 h-6 text-satin-gold" />
                        <p className="text-gray-800 font-medium italic leading-relaxed">{data.contact.email}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 bg-satin-gold/10 p-4 rounded-lg">
                        <Phone className="w-6 h-6 text-satin-gold" />
                        <p className="text-gray-800 font-medium italic leading-relaxed">{data.contact.phone}</p>
                    </div>

                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12 border border-gray-100"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-satin-gold/10 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 text-satin-gold" />
                    </div>
                    <h2 className="text-4xl md:text-5xl text-center mb-4 font-heading text-gray-800">
                        {data.rsvp.title}
                    </h2>
                    <p className="text-center text-gray-500 max-w-md italic">{data.rsvp.subtitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="relative">
                            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                <User className="w-4 h-4 text-satin-gold" />
                                {data.rsvp.fields.name} *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border-b-2 border-gray-100 bg-transparent focus:outline-none focus:border-satin-gold transition-colors placeholder-gray-300"
                            />
                        </div>

                        {/* Surname Input */}
                        <div className="relative">
                            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                <User className="w-4 h-4 text-satin-gold" />
                                {data.rsvp.fields.surname} *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.surname}
                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                className="w-full px-4 py-3 border-b-2 border-gray-100 bg-transparent focus:outline-none focus:border-satin-gold transition-colors placeholder-gray-300"
                            />
                        </div>
                    </div>

                    {/* Attendance Radio Buttons */}
                    <div className="bg-gray-50/50 p-6 rounded-xl">
                        <label className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-satin-gold" />
                            {data.rsvp.fields.attendance.label} *
                        </label>
                        <div className="flex flex-col md:flex-row gap-6">
                            {data.rsvp.fields.attendance.options.map((option, index) => (
                                <label key={index} className="flex items-center cursor-pointer group flex-1 bg-white p-4 rounded-lg border border-gray-100 hover:border-satin-gold transition-all">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        value={option}
                                        required
                                        checked={formData.attendance === option}
                                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                                        className="w-5 h-5 mr-3 accent-satin-gold"
                                    />
                                    <span className="group-hover:text-gray-900 font-medium text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Allergens Section */}
                    <div className="pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <ChefHat className="w-6 h-6 text-satin-gold" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 leading-tight">{data.rsvp.allergens.title}</h3>
                                <p className="text-xs text-gray-500 italic">{data.rsvp.allergens.subtitle}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                            {data.rsvp.allergens.options.map((allergen, index) => (
                                <label key={index} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-md transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={formData.allergens.includes(allergen)}
                                        onChange={() => handleAllergenChange(allergen)}
                                        className="w-5 h-5 mr-3 rounded accent-satin-gold"
                                    />
                                    <span className="group-hover:text-gray-700 text-sm text-gray-600">{allergen}</span>
                                </label>
                            ))}

                            {/* "Altro" Checkbox */}
                            <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-md transition-colors">
                                <input
                                    type="checkbox"
                                    checked={formData.showOtherField}
                                    onChange={() => handleAllergenChange(data.rsvp.allergens.other.label)}
                                    className="w-5 h-5 mr-3 rounded accent-satin-gold"
                                />
                                <span className="group-hover:text-gray-700 text-sm font-medium text-satin-gold">
                                    {data.rsvp.allergens.other.label}
                                </span>
                            </label>
                        </div>

                        {/* Conditional Textarea */}
                        <motion.div
                            initial={false}
                            animate={{
                                height: formData.showOtherField ? 'auto' : 0,
                                opacity: formData.showOtherField ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <textarea
                                value={formData.otherAllergen}
                                onChange={(e) => setFormData({ ...formData, otherAllergen: e.target.value })}
                                placeholder={data.rsvp.allergens.other.placeholder}
                                rows={4}
                                className="w-full mt-4 p-4 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-satin-gold transition-shadow bg-gray-50/30 resize-none text-sm"
                            />
                        </motion.div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 py-5 rounded-lg text-white font-bold text-lg shadow-lg shadow-satin-gold/20 transition-all hover:scale-[1.02] hover:shadow-xl bg-satin-gold active:scale-95"
                    >
                        <Send className="w-5 h-5" />
                        {data.rsvp.submit_button}
                    </button>
                </form>
            </motion.div>


        </section >
    );
}
