import {motion} from 'framer-motion'
import {Shirt, Palette} from 'lucide-react'

interface DressCodeProps {
  data: {
    dress_code: {
      title: string
      code: string
      description: string
      palette_label: string
      avoid_label: string
      suggested_colors: Array<{
        name: string
        hex: string
      }>
      avoid_colors: string[]
    }
  }
}

export default function DressCode({data}: DressCodeProps) {
  return (
    <section id="dress-code" className="section section-content bg-surface">
      <motion.div
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 0.8}}
        className="section-container section-card relative overflow-hidden"
      >
        {/* Decorative Icon */}
        <div className="absolute top-0 right-0 p-8 text-gray-50">
          <Shirt className="w-32 h-32 rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="section-icon !mb-6">
            <Shirt />
          </div>

          <h2 className="section-title-center">{data.dress_code.title}</h2>

          <div className="text-center text-lg md:text-2xl mb-8 md:mb-10 py-3 md:py-5 px-8 rounded-2xl font-heading bg-surface text-primary border border-primary/10 shadow-inner">
            {data.dress_code.code}
          </div>

          <p className="section-subtitle-center mb-10 md:mb-12">{data.dress_code.description}</p>

          {/* Suggested Colors Palette */}
          <div className="w-full mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Palette className="w-5 h-5 text-primary" />
              <h3 className="section-label text-gray-800">{data.dress_code.palette_label}</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.dress_code.suggested_colors.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{opacity: 0, scale: 0.8}}
                  whileInView={{opacity: 1, scale: 1}}
                  viewport={{once: true, margin: '-100px'}}
                  transition={{duration: 0.4, delay: 0.3 + index * 0.1}}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg mb-3 border-4 border-white transition-transform hover:scale-110 duration-300"
                    style={{backgroundColor: color.hex}}
                  />
                  <span className="text-xs md:text-sm font-bold text-gray-700  uppercase">
                    {color.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Colors to Avoid */}
          <div className="w-full text-center border-t border-gray-100 pt-8">
            <p className="text-gray-500">
              <span className="font-bold text-red-400 uppercase text-xs md:text-sm tracking-widest block mb-2">
                {data.dress_code.avoid_label}
              </span>{' '}
              <span className="text-base md:text-lg text-gray-700 font-medium italic">
                {data.dress_code.avoid_colors.join(', ')}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
