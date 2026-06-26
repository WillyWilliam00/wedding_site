import {motion, AnimatePresence} from 'framer-motion'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {useState} from 'react'

interface PhotoGalleryProps {
  images: {
    imageUrl: string
    alt: string
  }[]
  title?: string
}

export default function PhotoGallery({images, title = 'Galleria Fotografica'}: PhotoGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Don't render if there's only one or no images
  if (images.length <= 1) {
    return null
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-100px'}}
      transition={{duration: 0.8}}
      className="mt-12"
    >
      <h3 className="text-3xl md:text-4xl mb-8 font-heading text-white text-center">{title}</h3>
      <div className="relative rounded-2xl overflow-hidden bg-transparent shadow-xl border-2 border-primary shadow-primary/20 group max-w-5xl mx-auto">
        {/* Images */}
        <div className="aspect-video md:aspect-21/9 min-h-[400px] max-h-[600px] min-w-[400px] max-w-[600px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex].imageUrl}
              alt={images[currentImageIndex].alt}
              className="w-full h-full object-cover"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.3}}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          aria-label="Immagine precedente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          aria-label="Immagine successiva"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-primary w-8' : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`Vai all'immagine ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
