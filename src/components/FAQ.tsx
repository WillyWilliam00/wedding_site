import {motion} from 'framer-motion'
import {useState} from 'react'
import {ChevronDown} from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  data: {
    faq: {
      title: string
      items: FAQItem[]
    }
  }
}

export default function FAQ({data}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section section-content bg-background">
      <div className="section-container-narrow">
        <motion.h2
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-100px'}}
          transition={{duration: 0.6}}
          className="section-title-center"
        >
          {data.faq.title}
        </motion.h2>

        <div className="space-y-4">
          {data.faq.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-100px'}}
              transition={{duration: 0.5, delay: index * 0.1}}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors group"
              >
                <h3 className="text-sm md:text-base font-semibold pr-4 text-gray-800">
                  {item.question}
                </h3>
                <motion.div
                  animate={{rotate: openIndex === index ? 180 : 0}}
                  transition={{duration: 0.3}}
                  className="text-primary"
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{duration: 0.3}}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 section-body border-t border-gray-50 pt-4">
                  {item.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
