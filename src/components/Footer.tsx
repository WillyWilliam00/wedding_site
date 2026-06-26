import {motion} from 'framer-motion'
import {ExternalLink} from 'lucide-react'

interface FooterProps {
  data: {
    footer: {
      year: string
      credits: string
    }
    couple_names: {
      groom: string
      bride: string
    }
  }
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ')
  return parts[0]?.[0]?.toUpperCase() || ''
}

const Footer = ({data}: FooterProps) => {
  const {footer, couple_names} = data

  const groomInitial = getInitials(couple_names.groom)
  const brideInitial = getInitials(couple_names.bride)

  return (
    <footer className="relative section bg-linear-to-b from-primary/20 via-primary/10 to-primary/20 overflow-hidden">
      <div className="section-container">
        <motion.div
          className="flex flex-col items-center justify-center gap-8"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
        >
          <div className="flex items-center gap-6 w-full max-w-md">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-primary to-primary opacity-40" />
            <motion.div
              className="font-heading text-2xl tracking-[0.3em] text-primary opacity-60"
              initial={{opacity: 0, scale: 0.8}}
              whileInView={{opacity: 0.6, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.2}}
            >
              {groomInitial}&{brideInitial}
            </motion.div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-primary to-primary opacity-40" />
          </div>

          <motion.div
            className="text-center"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.6, delay: 0.4}}
          >
            <p className="section-label text-primary opacity-50 font-body normal-case tracking-[0.2em]">
              {footer.credits} {couple_names.groom} & {couple_names.bride} • {footer.year}
            </p>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <a
          className="flex items-center justify-center gap-2 section-label normal-case tracking-[0.2em] opacity-50 font-body"
          href="https://williamcosta.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="w-5 h-5 text-primary" />
          By William Costa
        </a>
      </div>
    </footer>
  )
}

export default Footer
