import {motion} from 'framer-motion'
import {Church, GlassWater, Utensils, Cake, Music, ChefHat, Moon, Martini} from 'lucide-react'

interface TimelineEvent {
  time: string
  event: string
  description: string
  long_description: string
  icon: string
}

interface TimelineProps {
  data: {
    timeline: {
      title: string
      events: TimelineEvent[]
    }
  }
}

const iconComponents = {
  church: <Church className="w-6 h-6" />,
  glass: <GlassWater className="w-6 h-6" />,
  utensils: <Utensils className="w-6 h-6" />,
  cake: <Cake className="w-6 h-6" />,
  music: <Music className="w-6 h-6" />,
  chefhat: <ChefHat className="w-6 h-6" />,
  moon: <Moon className="w-6 h-6" />,
  martini: <Martini className="w-6 h-6" />,
}

export default function Timeline({data}: TimelineProps) {
  return (
    <section
      id="timeline"
      className="section section-content bg-linear-to-tr from-surface to-primary/30 overflow-hidden"
    >
      <div className="">
        <motion.h2
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-100px'}}
          transition={{duration: 0.6}}
          className="section-title-center"
        >
          {data.timeline.title}
        </motion.h2>

        <div className="relative max-w-xl mx-auto xl:max-w-none">
          {/* Horizontal Connector Line (desktop) */}
          <div className="absolute top-12 left-[5%] right-[5%] h-0.5 bg-primary/30 hidden xl:block">
            <motion.div
              initial={{width: 0}}
              whileInView={{width: '100%'}}
              viewport={{once: true}}
              transition={{duration: 1.5, ease: 'easeInOut'}}
              className="h-full bg-primary"
            />
          </div>

          {/* Timeline Events Container */}
          <div className="flex flex-col xl:flex-row justify-between items-start gap-12 xl:gap-4 relative">
            {data.timeline.events.map((event, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-50px'}}
                transition={{duration: 0.6, delay: index * 0.2}}
                className="flex flex-row xl:flex-col items-start xl:items-center gap-4 xl:gap-0 text-left xl:text-center w-full xl:w-1/3 group relative"
              >
                {/* Vertical segment between bubbles (mobile only) */}
                {index < data.timeline.events.length - 1 && (
                  <div className="absolute left-8 md:left-12 top-8 md:top-12 -translate-x-1/2 w-0.5 -bottom-12 bg-primary/30 xl:hidden z-0 overflow-hidden">
                    <motion.div
                      initial={{height: 0}}
                      whileInView={{height: '100%'}}
                      viewport={{once: true}}
                      transition={{duration: 1.5, ease: 'easeInOut', delay: index * 0.2}}
                      className="w-full bg-primary"
                    />
                  </div>
                )}

                {/* Time Bubble */}
                <motion.div
                  whileHover={{scale: 1.1}}
                  className="z-10 shrink-0 bg-white border-2 border-primary text-primary w-16 h-16 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center shadow-md mb-0 xl:mb-8 transition-colors group-hover:bg-primary group-hover:text-white"
                >
                  <div className="mb-1">
                    {iconComponents[event.icon.toLowerCase() as keyof typeof iconComponents] ||
                      iconComponents.church}
                  </div>
                  <span className="text-[10px] md:text-sm font-bold tracking-wider">
                    {event.time}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="pt-1 xl:pt-0 px-0 xl:px-4">
                  <h3 className="section-heading-sm text-primary mb-2">{event.event}</h3>
                  <p className="font-semibold text-sm md:text-base mb-2 text-secondary">
                    {event.description}
                  </p>
                  <p className="section-body max-w-none xl:max-w-[250px] xl:mx-auto">
                    {event.long_description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
