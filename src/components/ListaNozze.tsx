import {motion} from 'framer-motion'
import {Gift, Copy, Check} from 'lucide-react'
import {useState} from 'react'

interface ListaNozzeProps {
  data: {
    listaNozze: {
      title: string
      message: string
      iban: string
      beneficiary: string
    }
  }
}

export default function ListaNozze({data}: ListaNozzeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(data.listaNozze.iban)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section id="lista-nozze" className="section section-content bg-background">
      <motion.div
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 0.8}}
        className="section-container-narrow text-center"
      >
        <div className="section-icon">
          <Gift />
        </div>

        <h2 className="section-title-center">{data.listaNozze.title}</h2>

        <p className="section-subtitle-center mb-10 md:mb-14">{data.listaNozze.message}</p>

        <div className="section-card rounded-3xl shadow-xl relative overflow-hidden group text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110" />

          <div className="relative z-10 space-y-10">
            <div>
              <p className="section-label mb-3">Intestatario</p>
              <p className="text-lg md:text-xl font-heading text-gray-800">
                {data.listaNozze.beneficiary}
              </p>
            </div>

            <div className="space-y-4">
              <p className="section-label">IBAN</p>
              <div className="relative group/iban">
                <div className="text-sm md:text-lg font-mono tracking-tight p-4 md:p-6 rounded-2xl bg-gray-50 text-gray-700 break-all border border-gray-100 group-hover/iban:border-primary/30 transition-all">
                  {data.listaNozze.iban}
                </div>

                <button
                  onClick={handleCopy}
                  className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95 bg-primary min-w-[200px] justify-center text-sm md:text-base"
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
  )
}
