import {motion} from 'framer-motion'
import {Heart} from 'lucide-react'

interface ChiSiamoProps {
  data: {
    chi_siamo: {
      title: string
      subtitle: string
      text: string
      badge: string
      image_url: string
    }
  }
}

export default function ChiSiamo({data}: ChiSiamoProps) {
  return (
    <section
      id="chi-siamo"
      className="min-h-[70vh] flex items-center justify-center px-6 py-24 md:py-40 bg-background overflow-hidden relative"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image Column */}
        <motion.div
          initial={{opacity: 0, x: -50}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true, margin: '-100px'}}
          transition={{duration: 1.2, ease: 'easeOut'}}
          className="relative order-2 md:order-1"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-8 -left-8 w-32 h-32 border-l-2 border-t-2 border-primary/20 z-0" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 border-r-2 border-b-2 border-primary/20 z-0" />

          <div className="relative z-10 p-4 bg-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-in-out group">
            <div className="overflow-hidden aspect-4/5 relative">
              <motion.img
                src={data.chi_siamo.image_url}
                alt="Il nostro amore"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </div>

          <motion.div
            initial={{opacity: 0, scale: 0.8}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{delay: 0.5, duration: 0.8}}
            className="absolute -bottom-4 -left-4 z-20 bg-white/90 backdrop-blur-sm p-4 shadow-lg border border-primary/10 hidden md:block"
          >
            <Heart className="w-8 h-8 text-primary fill-primary/20" />
          </motion.div>
        </motion.div>

        {/* Text Column */}
        <motion.div
          initial={{opacity: 0, x: 50}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true, margin: '-100px'}}
          transition={{duration: 1.2, ease: 'easeOut'}}
          className="flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2"
        >
          <div className="inline-flex items-center gap-4 mb-6 text-primary/60 uppercase tracking-widest text-xs md:text-sm font-medium">
            <span className="w-8 h-px bg-primary/30"></span>
            {data.chi_siamo.title}
            <span className="w-8 h-px bg-primary/30"></span>
          </div>

          <h2 className="text-3xl md:text-6xl mb-8 font-heading text-gray-800 leading-tight">
            {data.chi_siamo.subtitle.includes(',') ? (
              <>
                {data.chi_siamo.subtitle.split(',').slice(0, -1).join(' ')}
                {','}
                <span className="text-primary italic">
                  {data.chi_siamo.subtitle.split(',').slice(-1).join(' ')}
                </span>
              </>
            ) : (
              data.chi_siamo.subtitle
            )}
          </h2>

          <div className="w-20 h-1 bg-primary/20 mb-8" />

          <p className="text-base md:text-xl leading-[1.8] font-body font-normal text-gray-600 italic">
            "{data.chi_siamo.text}"
          </p>

          <div className="mt-12 flex gap-4">
            <motion.div
              whileHover={{y: -5}}
              className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary"
            >
              <Heart className="w-5 h-5" />
            </motion.div>
            <div className="flex flex-col justify-center">
              <span className="text-xs text-gray-400 tracking-tighter uppercase">
                Dal primo giorno ad oggi
              </span>
              <span className="text-sm font-heading text-gray-600">{data.chi_siamo.badge}</span>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute top-0 right-0 rounded-bl-full bg-primary/40 p-4 w-40 h-40" />
      <div className="absolute bottom-0 left-0 rounded-tr-full bg-primary/40 p-4 w-40 h-40" />
      <div className="absolute top-1/2  right-36 rotate-35 hover:rotate-0 transition-transform duration-700 ease-in-out group">
        <Heart className="w-48 h-48 text-primary/20 group-hover:text-primary group-hover:scale-110 transition-all duration-700 ease-in-out" />
      </div>
    </section>
  )
}
