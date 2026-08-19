import {motion} from 'framer-motion'
import { Mail, Phone} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────


interface RSVPFormProps {
  data: {
    rsvp: {
      title: string
      subtitle: string
      fields: {
        name: string
        surname: string
      }
      allergens: {
        title: string
        subtitle: string
        options: string[]
        other: {
          label: string
          placeholder: string
        }
      }
      foodPreferences: {
        title: string
        subtitle: string
        options: string[]
        other: {
          label: string
          placeholder: string
        }
      }
      submit_button: string
      success_message: string
    }
    contacts: {
      title: string
      details: Record<string, {email: string; phone: string}>
      thanks_text: string
      thanks_image: string
    }
  }
}


export default function RSVPForm({data}: RSVPFormProps) {
  // 1. Inizializzazione del FORM con TanStack Form
  

  return (
    <section id="rsvp" className="section section-content gap-6 bg-surface">
      {/* Contatti */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        className="section-container-narrow mb-10 md:mb-12"
      >
        <h3 className="section-heading-sm text-center mb-6">{data.contacts.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.contacts.details).map(([key, info]) => (
            <div key={key} className="flex flex-col gap-4">
              {/* Blocco Email */}
              <div className="flex items-center justify-center gap-3 bg-white/50 border border-primary/10 p-4 rounded-xl shadow-sm">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  className="text-sm md:text-base font-medium text-gray-700 italic hover:underline"
                  href={`mailto:${info.email}?subject=Matrimonio%20Martina%20e%20William&body=Ciao%2C%20ho%20avuto%20difficolt%C3%A0%20a%20compilare%20il%20form`}
                >
                  {info.email}
                </a>
              </div>

              {/* Blocco Telefono */}
              <div className="flex items-center justify-center gap-3 bg-white/50 border border-primary/10 p-4 rounded-xl shadow-sm">
                <Phone className="w-5 h-5 text-primary" />
                <a
                  className="text-sm md:text-base font-medium text-gray-700 italic hover:underline"
                  href={`tel:${info.phone}`}
                >
                  {info.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card del Form */}
      <motion.div
        initial={{opacity: 0, y: 40}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        className="section-container section-card rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary/20 via-primary to-primary/20" />

        <div className="flex flex-col items-center mb-10 md:mb-12">
          <h2 className="section-title-center mb-4 tracking-tight">{data.rsvp.title}</h2>
          <p className="section-subtitle-center">{data.rsvp.subtitle}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm border border-primary/20 p-8 md:p-10 rounded-2xl shadow-lg text-center flex flex-col items-center gap-4"
        >

          <h3 className="text-xl md:text-2xl font-serif text-gray-800 font-medium">
            I festeggiamenti si avvicinano!
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Le registrazioni ufficiali (RSVP) sono ora concluse. Siamo felicissimi dell'affetto ricevuto e non vediamo l'ora di condividere questa giornata speciale insieme a voi!
          </p>

          <div className="w-12 h-[1px] bg-primary/20 my-2" />

          <p className="text-xs md:text-sm text-gray-500 italic">
            Per qualsiasi comunicazione urgente o necessità dell'ultimo minuto, non esitate a contattarci direttamente utilizzando i riferimenti sopra.
          </p>
        </motion.div>

       
      </motion.div>
    </section>
  )
}
