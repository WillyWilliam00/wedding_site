import { useWeddingData } from './useWeddingData'
import { urlFor } from '../lib/sanityClient'
import type { UnifiedWeddingData } from '../types/wedding'

/**
 * useUnifiedWeddingData
 * 
 * CLEANED VERSION: Relies on Sanity validation and initial values.
 * Removed redundant manual fallbacks for a pure Data-Driven architecture.
 */
export function useUnifiedWeddingData() {
  const { data: sanityData } = useWeddingData()

  // We explicitly map the raw Sanity data to our UnifiedWeddingData interface structure.
  const activeData: UnifiedWeddingData = {
    // Basic Info from Site Settings
    couple_names: sanityData.siteSettings.coupleNames,
    wedding_date: sanityData.siteSettings.weddingDate,

    hero: {
      tagline: sanityData.siteSettings.heroTagline,
      image_url: sanityData.siteSettings.heroImage ? urlFor(sanityData.siteSettings.heroImage).url() : '',
      countdown_labels: sanityData.siteSettings.countdownLabels
    },

    navbar: {
      links: sanityData.siteSettings.navbar?.links || []
    },

    chi_siamo: {
      title: sanityData.chiSiamo?.title || '',
      subtitle: sanityData.chiSiamo?.subtitle || "La nostra storia d'amore",
      text: sanityData.chiSiamo?.text || '',
      badge: sanityData.chiSiamo?.badge || "Per sempre insieme",
      image_url: sanityData.chiSiamo?.image ? urlFor(sanityData.chiSiamo.image).url() : '',
    },

    timeline: {
      title: sanityData.siteSettings.sectionTitles.timeline,
      events: sanityData.timeline || [],
    },

    location: {
      name: sanityData.location?.name || '',
      address: sanityData.location?.address || '',
      coordinates: sanityData.location?.coordinates
        ? ([sanityData.location.coordinates.lng, sanityData.location.coordinates.lat] as [number, number])
        : ([0, 0] as [number, number]),
      image_url: sanityData.location?.image ? urlFor(sanityData.location.image).url() : '',
      google_maps_url: sanityData.location?.googleMapsUrl || '',
      description: sanityData.location?.description || '',
      gallery: [],
    },
    chiesa: {
      name: sanityData.chiesa.name || '',
      address: sanityData.chiesa.address || '',
      coordinates: sanityData.chiesa.coordinates
        ? ([sanityData.chiesa.coordinates.lng, sanityData.chiesa.coordinates.lat] as [number, number])
        : ([0, 0] as [number, number]),
      image_url: sanityData.chiesa.image ? urlFor(sanityData.chiesa.image).url() : '',
      google_maps_url: sanityData.chiesa.googleMapsUrl || '',
      description: sanityData.chiesa.description || '',
      gallery: sanityData.chiesa.gallery?.map((image: { asset: any, alt: string }) => {
        return {
          imageUrl: urlFor(image.asset).url(),
          alt: image.alt
        }
      }) || [],
    },

    gallery: sanityData.gallery?.map((image: { asset: any, alt: string }) => {
      return {
        imageUrl: urlFor(image.asset).url(),
        alt: image.alt
      }
    }),

    menu: {
      title: sanityData.menu?.title || '',
      sections: sanityData.menu?.sections || []
    },

    listaNozze: {
      title: sanityData.listaNozze?.title || '',
      message: sanityData.listaNozze?.message || '',
      iban: sanityData.listaNozze?.iban || '',
      beneficiary: sanityData.listaNozze?.beneficiary || '',
    },

    faq: {
      title: sanityData.siteSettings.sectionTitles.faq,
      items: sanityData.faq || [],
    },

    dress_code: {
      title: sanityData.dressCode?.title || '',
      code: sanityData.dressCode?.code || '',
      description: sanityData.dressCode?.description || '',
      palette_label: sanityData.dressCode?.paletteLabel || 'Palette Colori Suggerita',
      avoid_label: sanityData.dressCode?.avoidLabel || 'Si prega di evitare:',
      suggested_colors: sanityData.dressCode?.suggestedColors || [],
      avoid_colors: sanityData.dressCode?.avoidColors || [],
    },

    accommodation: {
      title: sanityData.accommodation?.title || '',
      subtitle: sanityData.accommodation?.subtitle || '',
      options: sanityData.accommodation?.options?.map((opt: any) => ({
        ...opt,
        image_url: urlFor(opt.image).url()
      })),
    },

    rsvp: {
      title: sanityData.contactSettings?.rsvpLabels?.title || 'Conferma la tua Presenza',
      subtitle: sanityData.contactSettings?.rsvpDeadline ? `Rispondi entro il ${sanityData.contactSettings.rsvpDeadline}` : '',
      fields: {
        name: sanityData.contactSettings?.rsvpLabels?.nameLabel || 'Nome',
        surname: sanityData.contactSettings?.rsvpLabels?.surnameLabel || 'Cognome',
        attendance: {
          label: sanityData.contactSettings?.rsvpLabels?.attendanceLabel || 'Parteciperai?',
          options: ['Sì, ci sarò!', 'Mi dispiace, non potrò']
        }
      },
      allergens: {
        title: sanityData.contactSettings?.rsvpLabels?.allergensTitle || 'Allergie e Intolleranze',
        subtitle: 'Seleziona eventuali allergie o intolleranze alimentari',
        options: ['Glutine', 'Lattosio', 'Crostacei', 'Frutta a guscio', 'Uova', 'Pesce', 'Soia'],
        other: { label: 'Altro', placeholder: 'Specifica...' }
      },
      foodPreferences: {
        title: sanityData.contactSettings?.rsvpLabels?.foodPreferencesTitle || 'Preferenze Alimentari',
        subtitle: 'Seleziona eventuali preferenze alimentari',
        options: ['Vegetariano', 'Vegano'],
        other: { label: 'Altro', placeholder: 'Specifica...' }
      },
      submit_button: sanityData.contactSettings?.rsvpLabels?.submitButton || 'Invia Conferma',
      success_message: sanityData.contactSettings?.successMessage || '',
      error_message: 'Errore durante l\'invio. Riprova più tardi.'
    },

    contact: {
      title: 'Contattaci per info',
      email: sanityData.contactSettings?.email || '',
      phone: sanityData.contactSettings?.phone || '',
      thanks_text: sanityData.contactSettings?.thanksText || '',
      thanks_image: sanityData.contactSettings?.thanksImage ? urlFor(sanityData.contactSettings.thanksImage).url() : '',
    },

    footer: {
      year: new Date().getFullYear().toString(),
      credits: sanityData.siteSettings.footer.credits,
    }
  }

  // Inject Styles
  const { colors } = sanityData.siteSettings;
  const root = document.documentElement;
  if (colors) {
    if (colors.primary) root.style.setProperty('--primary', colors.primary);
    if (colors.background) root.style.setProperty('--background', colors.background);
    if (colors.surface) root.style.setProperty('--surface', colors.surface);
    if (colors.textPrimary) root.style.setProperty('--text-primary', colors.textPrimary);
    if (colors.textSecondary) root.style.setProperty('--text-secondary', colors.textSecondary);
  }

  return { activeData }
}
