import {motion, useScroll, useTransform} from 'framer-motion'
import {useHandleResize} from '../hooks/useHandleResize'
import {useCountDown} from '../hooks/useCountDown'

interface HeroSectionProps {
  data: {
    couple_names: {
      groom: string
      bride: string
    }
    hero: {
      tagline: string
      image_url: string
      countdown_labels: {
        days: string
        hours: string
        minutes: string
        seconds: string
      }
    }
    wedding_date: string
  }
}

export default function HeroSection({data}: HeroSectionProps) {
  const {couple_names, hero, wedding_date} = data
  const timeLeft = useCountDown(wedding_date)
  const {scrollY} = useScroll()
  const vh = useHandleResize()

  const y = useTransform(scrollY, [0, vh], ['-5%', '10%'])
  const scale = useTransform(scrollY, [0, vh], [1.1, 1.25])
  const opacity = useTransform(scrollY, [0, vh * 0.8, vh], [1, 1, 0.4])

  const contentY = useTransform(scrollY, [0, vh], ['0%', '-30%'])
  const contentOpacity = useTransform(scrollY, [0, vh * 0.5], [1, 0])

  return (
    <section id="hero" className="sticky top-0 w-full h-dvh overflow-hidden flex flex-col z-0">
      {/* Background Image & Vignette */}
      {/* Background Image & Vignette */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{y, scale, opacity}} className="w-full h-full">
          <img src={hero.image_url} alt="Wedding Hero" className="w-full h-full object-cover" />
        </motion.div>
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%]" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Central Content */}
      <motion.div
        style={{y: contentY, opacity: contentOpacity}}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, ease: 'easeOut'}}
        >
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-heading text-background drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] tracking-tighter">
            {couple_names.groom.split(' ')[0]}
            <span className="inline-block mx-4 md:mx-8 scale-75 md:scale-90 align-middle text-primary">
              &
            </span>
            {couple_names.bride.split(' ')[0]}
          </h1>
          <div className="mt-6 md:mt-8 flex items-center justify-center gap-4 md:gap-8">
            <span className="w-12 md:w-24 h-0.5 bg-primary/40" />
            <span className="text-lg md:text-3xl text-background/90 italic font-heading tracking-widest drop-shadow-md">
              {hero.tagline}
            </span>
            <span className="w-12 md:w-24 h-0.5 bg-primary/40" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Countdown Bar (Bottom) */}
      <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8, delay: 0.5}}
        style={{opacity: contentOpacity}}
        className="relative z-20 w-full pb-12 px-4 md:flex md:justify-end md:pe-12"
      >
        <div className="bg-background/10 backdrop-blur-md border border-primary/20 rounded-2xl px-8 py-4 md:py-6 shadow-2xl flex gap-8 md:gap-16">
          {[
            {value: timeLeft.days, label: hero.countdown_labels.days},
            {value: timeLeft.hours, label: hero.countdown_labels.hours},
            {value: timeLeft.minutes, label: hero.countdown_labels.minutes},
            {value: timeLeft.seconds, label: hero.countdown_labels.seconds},
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="text-lg md:text-4xl font-bold text-primary font-body drop-shadow-sm">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-background mt-1 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
