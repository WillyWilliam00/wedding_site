import {motion} from 'framer-motion'
import {Gift, Copy, Check, ShoppingCart} from 'lucide-react'
import {useEffect, useState} from 'react'
import type {ListaNozzeData} from '../types/wedding'

interface ListaNozzeProps {
  data: {
    listaNozze: ListaNozzeData
  }
}
type Tab = 'iban' | 'amazon' | null

export default function ListaNozze({data}: ListaNozzeProps) {
  const [copied, setCopied] = useState<Tab>(null)

  const [tabs, setTabs] = useState<'lunaDiMiele' | 'listaAmazon'>('lunaDiMiele')

  const handleCopy = async (toCopy: string, tabType: Tab) => {
    try {
      await navigator.clipboard.writeText(toCopy)
      setCopied(tabType)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Errore durante la copia:', err)
    }
  }

  useEffect(() => {
    console.log(copied)
  }, [copied])

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

        <h2 className="section-title-center">{data.listaNozze.campiSezione.titleHeader}</h2>

        <p className="section-subtitle-center mb-10 md:mb-14">
          {data.listaNozze.campiSezione.descriptionHeader}
        </p>

        <div className="shadow-xl relative mx-auto grid w-full max-w-sm grid-cols-2 rounded-full p-1 bg-[#FCFBF8]">
          <span
            className="absolute inset-y-1 left-0 w-[calc(50%-0.25rem)] bg-primary rounded-full transition-all"
            style={{transform: tabs === 'lunaDiMiele' ? 'translateX(0%)' : 'translateX(100%)'}}
          />
          <button
            onClick={() => setTabs('lunaDiMiele')}
            className={`relative z-10 px-4 py-2 text-sm font-bold md:text-base justify-center ${
              tabs === 'lunaDiMiele' ? 'text-white' : 'text-gray-400'
            }`}
          >
            {data.listaNozze.lunaDiMiele.switchTitle}
          </button>
          <button
            onClick={() => setTabs('listaAmazon')}
            className={`relative z-10 px-4 py-2 text-sm font-bold md:text-base justify-center ${
              tabs === 'listaAmazon' ? 'text-white' : 'text-gray-400'
            }`}
          >
            {data.listaNozze.listaAmazon.switchTitle}
          </button>
        </div>

        <div className="h-[350px] mt-16">
          {tabs === 'lunaDiMiele' && (
            <div className=" section-card rounded-3xl shadow-xl relative overflow-hidden group text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110" />

              <div className="relative z-10 space-y-10">
                <div>
                  <p className="section-label mb-3">Intestatario</p>
                  <p className="text-lg md:text-xl font-heading text-gray-800">
                    {data.listaNozze.lunaDiMiele.beneficiary}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="section-label">IBAN</p>
                  <div className="relative group/iban">
                    <div className="text-sm md:text-lg font-mono tracking-tight p-4 rounded-2xl bg-gray-50 text-gray-700 break-all border border-gray-100 group-hover/iban:border-primary/30 transition-all">
                      {data.listaNozze.lunaDiMiele.iban}
                    </div>

                    <button
                      onClick={() => handleCopy(data.listaNozze.lunaDiMiele.iban, 'iban')}
                      className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95 bg-primary min-w-[200px] justify-center text-sm md:text-base"
                    >
                      {copied === 'iban' ? (
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
          )}
          {tabs === 'listaAmazon' && (
            <div className="section-card rounded-3xl shadow-xl relative overflow-hidden group text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110" />

              <div className="relative z-10 space-y-10">
                <div className="space-y-2">
                  <p className="section-label">{data.listaNozze.listaAmazon.miniTitle}</p>
                  <p className="font-heading">{data.listaNozze.listaAmazon.description}</p>
                </div>

                <div className="flex justify-center flex-col items-center gap-4">
                  <a
                    href={data.listaNozze.listaAmazon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit flex items-center gap-2 px-2 py-4 rounded-xl text-white font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95 bg-primary min-w-[200px] justify-center text-sm md:text-base"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Vai alla lista
                  </a>
                  <button
                    onClick={() => handleCopy(data.listaNozze.listaAmazon.link, 'amazon')}
                    className="text-xs font-medium underline-offset-4 hover:text-[var(--wedding-ink)] hover:underline"
                  >
                    {copied === 'amazon' ? 'Link copiato ✓' : 'oppure copia il link'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
