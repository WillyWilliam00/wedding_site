import {useForm} from '@tanstack/react-form'
import {motion, AnimatePresence} from 'framer-motion'
import {ChefHat, Send, Mail, Phone, Plus, Minus, Trash2} from 'lucide-react'
import {supabase} from '../lib/supabase'
import toast from 'react-hot-toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface GuestEntry {
  name: string
  surname: string
  allergens: string[]
  otherAllergen: string
  showOther: boolean
  foodPreferences: string[]
  otherFoodPreference: string
  showOtherFoodPreference: boolean
}

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

const makeGuest = (): GuestEntry => ({
  name: '',
  surname: '',
  allergens: [],
  otherAllergen: '',
  showOther: false,
  foodPreferences: [],
  otherFoodPreference: '',
  showOtherFoodPreference: false,
})

export default function RSVPForm({data}: RSVPFormProps) {
  // 1. Inizializzazione del FORM con TanStack Form
  console.log(data)
  const form = useForm({
    defaultValues: {
      guests: [makeGuest()] as GuestEntry[],
    },
    validators: {
      onMount: ({value}) => {
        const isInvalid = value.guests.some(
          (guest) => !guest.name?.trim() || !guest.surname?.trim(),
        )
        if (isInvalid) return 'Missing fields'
        return undefined
      },
      onChange: ({value}) => {
        // Controlliamo se tutti gli ospiti hanno nome e cognome
        const isInvalid = value.guests.some(
          (guest) => !guest.name?.trim() || !guest.surname?.trim(),
        )

        // Se ritorniamo una stringa, il form è "invalid" e canSubmit diventa false
        if (isInvalid) return 'Missing fields'

        // Se ritorniamo undefined, il form è "valid" e canSubmit diventa true
        return undefined
      },
    },
    onSubmit: async ({value}) => {
      try {
        const keys = value.guests.map(
          (g) => `${g.name.trim().toLowerCase()}-${g.surname.trim().toLowerCase()}`,
        )
        if (new Set(keys).size !== keys.length) {
          toast.error('Hai inserito uno stesso ospite più volte')
          return
        }
        const {data: groupData, error: groupError} = await supabase
          .from('rsvp_groups')
          .insert([{}])
          .select('id')
          .single()

        if (groupError) throw groupError

        const guestsToInsert = value.guests.map((g) => ({
          group_id: groupData.id,
          name: g.name.trim().toLowerCase(),
          surname: g.surname.trim().toLowerCase(),
          allergens: {
            allergens: g.allergens,
            other_allergen: g.showOther ? g.otherAllergen.trim() : null,
          },
          food_preferences: {
            preferences: g.foodPreferences,
            other: g.showOtherFoodPreference ? g.otherFoodPreference.trim() : null,
          },
        }))

        const {error: guestsError} = await supabase.from('guests').insert(guestsToInsert)

        if (guestsError) {
          if (guestsError.code === '23505') {
            toast.error('Ospite già presente')
            return
          }
          throw guestsError
        }

        toast.success(data.rsvp.success_message)
        form.reset()
      } catch (err) {
        console.error("Errore durante l'invio RSVP:", err)
        toast.error(
          "Ops! C'è stato un errore tecnico. Per favore riprova o contattaci direttamente.",
        )
      }
    },
  })

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

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
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
                    <p className="text-xs text-gray-400">
                      Aggiungi gli invitati presenti nell'invito
                    </p>
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
                    <span className="w-8 text-center text-2xl font-bold font-heading text-primary">
                      {guestsField.state.value.length}
                    </span>
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
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.95}}
                        className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 relative group"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary italic">
                              #{i + 1}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                              Ospite
                            </span>
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
                          <form.Field
                            name={`guests[${i}].name`}
                            validators={{
                              onChange: ({value}) => {
                                if (!value) {
                                  return 'Il nome è obbligatorio'
                                }
                              },
                            }}
                          >
                            {(field) => (
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                                  {data.rsvp.fields.name} *
                                </label>
                                <input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value ?? ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  className="w-full bg-white border-b-2 border-gray-100 px-1 py-2 text-gray-800 focus:border-primary outline-none transition-colors placeholder:text-gray-200"
                                  placeholder="es. Giulia"
                                />
                                {field.state.meta.errors.length > 0 && (
                                  <span className="text-[10px] text-red-500 font-bold uppercase">
                                    {field.state.meta.errors[0]}
                                  </span>
                                )}
                              </div>
                            )}
                          </form.Field>

                          <form.Field
                            name={`guests[${i}].surname`}
                            validators={{
                              onChange: ({value}) => {
                                if (!value) {
                                  return 'Il cognome è obbligatorio'
                                }
                              },
                            }}
                          >
                            {(field) => (
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                                  {data.rsvp.fields.surname} *
                                </label>
                                <input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value ?? ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  className="w-full bg-white border-b-2 border-gray-100 px-1 py-2 text-gray-800 focus:border-primary outline-none transition-colors placeholder:text-gray-200"
                                  placeholder="es. Bianchi"
                                />
                                {field.state.meta.errors.length > 0 && (
                                  <span className="text-[10px] text-red-500 font-bold uppercase">
                                    {field.state.meta.errors[0]}
                                  </span>
                                )}
                              </div>
                            )}
                          </form.Field>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 justify-around">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <ChefHat className="w-4 h-4 text-primary" />
                              <span className="text-xs font-bold uppercase tracking-widest">
                                {data.rsvp.allergens.title}
                              </span>
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
                                          const current = field.state.value ?? []
                                          field.handleChange(
                                            current.includes(opt)
                                              ? current.filter((o) => o !== opt)
                                              : [...current, opt],
                                          )
                                        }}
                                        className="w-4 h-4 rounded-md border-gray-300 text-primary focus:ring-primary accent-primary"
                                      />
                                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                                        {opt}
                                      </span>
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
                                    <span className="text-xs font-bold text-primary uppercase tracking-tighter">
                                      {data.rsvp.allergens.other.label}
                                    </span>
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
                                        <motion.div
                                          initial={{height: 0, opacity: 0}}
                                          animate={{height: 'auto', opacity: 1}}
                                          exit={{height: 0, opacity: 0}}
                                          className="overflow-hidden"
                                        >
                                          <textarea
                                            id={otherField.name}
                                            value={otherField.state.value ?? ''}
                                            onChange={(e) =>
                                              otherField.handleChange(e.target.value)
                                            }
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
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <ChefHat className="w-4 h-4 text-primary" />
                              <span className="text-xs font-bold uppercase tracking-widest">
                                {data.rsvp.foodPreferences.title}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                              {data.rsvp.foodPreferences.options.map((opt) => (
                                <form.Field name={`guests[${i}].foodPreferences`} key={opt}>
                                  {(field) => (
                                    <label className="flex items-center gap-3 cursor-pointer group select-none bg-white/50 p-3 rounded-xl border border-transparent hover:border-primary/10 transition-all">
                                      <input
                                        type="checkbox"
                                        checked={(field.state.value ?? []).includes(opt)}
                                        onChange={() => {
                                          const current = field.state.value ?? []
                                          field.handleChange(
                                            current.includes(opt)
                                              ? current.filter((o) => o !== opt)
                                              : [...current, opt],
                                          )
                                        }}
                                        className="w-4 h-4 rounded-md border-gray-300 text-primary focus:ring-primary accent-primary"
                                      />
                                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                                        {opt}
                                      </span>
                                    </label>
                                  )}
                                </form.Field>
                              ))}

                              <form.Field name={`guests[${i}].showOtherFoodPreference`}>
                                {(field) => (
                                  <label className="flex items-center gap-3 cursor-pointer group select-none bg-white p-3 rounded-xl border border-primary/5 hover:border-primary transition-all">
                                    <input
                                      type="checkbox"
                                      checked={field.state.value ?? false}
                                      onChange={(e) => field.handleChange(e.target.checked)}
                                      className="w-4 h-4 rounded-md border-gray-300 text-primary accent-primary"
                                    />
                                    <span className="text-xs font-bold text-primary uppercase tracking-tighter">
                                      {data.rsvp.allergens.other.label}
                                    </span>
                                  </label>
                                )}
                              </form.Field>
                            </div>

                            {/* Textarea Altro condizionale */}
                            <form.Field name={`guests[${i}].showOtherFoodPreference`}>
                              {(showOtherField) => (
                                <AnimatePresence>
                                  {showOtherField.state.value && (
                                    <form.Field name={`guests[${i}].otherFoodPreference`}>
                                      {(otherField) => (
                                        <motion.div
                                          initial={{height: 0, opacity: 0}}
                                          animate={{height: 'auto', opacity: 1}}
                                          exit={{height: 0, opacity: 0}}
                                          className="overflow-hidden"
                                        >
                                          <textarea
                                            id={otherField.name}
                                            value={otherField.state.value ?? ''}
                                            onChange={(e) =>
                                              otherField.handleChange(e.target.value)
                                            }
                                            placeholder={
                                              data.rsvp.foodPreferences.other.placeholder
                                            }
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
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-bold text-base shadow-xl transition-all active:scale-95 group ${
                  !canSubmit
                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                    : 'bg-primary shadow-primary/20 hover:scale-[1.01] hover:shadow-2xl'
                }`}
              >
                {isSubmitting ? (
                  <span className="animate-pulse italic text-sm">Inviando la conferma...</span>
                ) : (
                  <>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {data.rsvp.submit_button}
                    </span>
                    <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            )}
          </form.Subscribe>
        </form>
      </motion.div>
    </section>
  )
}
