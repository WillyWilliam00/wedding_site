import type {SanityImageSource} from '@sanity/image-url'

export interface SanityWeddingData {
  siteSettings: SiteSettings
  timeline: TimelineEvent[]
  faq: FaqItem[]
  location: LocationData
  gallery: GalleryData[]
  listaNozze: ListaNozzeData
  chiSiamo: ChiSiamoData
  dressCode: DressCodeData
  accommodation: AccommodationData
  contactSettings: ContactSettingsData
  menu: MenuData
  chiesa: ChiesaData
}

export interface GalleryData {
  asset: SanityImageSource
  alt: string
}

export interface UnifiedWeddingData {
  couple_names: {
    groom: string
    bride: string
  }
  wedding_date: string
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
  navbar: {
    links: Array<{label: string; href: string}>
  }
  chi_siamo: {
    title: string
    subtitle: string
    text: string
    badge: string
    image_url: string
  }
  timeline: {
    title: string
    events: TimelineEvent[]
  }
  location: {
    name: string
    address: string
    coordinates: [number, number]
    image_url: string
    google_maps_url: string
    description: string
    gallery: string[]
  }
  chiesa: {
    name: string
    address: string
    coordinates: [number, number]
    image_url: string
    google_maps_url: string
    description: string
    gallery: {
      imageUrl: string
      alt: string
    }[]
  }
  gallery: {
    imageUrl: string
    alt: string
  }[]
  menu: {
    title: string
    sections: Array<{
      name: string
      items: string[]
    }>
  }
  listaNozze: {
    title: string
    message: string
    iban: string
    beneficiary: string
  }
  faq: {
    title: string
    items: FaqItem[]
  }
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
  accommodation: {
    title: string
    subtitle: string
    options: AccommodationOption[]
  }
  rsvp: {
    title: string
    subtitle: string
    fields: {
      name: string
      surname: string
      attendance: {
        label: string
        options: string[]
      }
    }
    allergens: {
      title: string
      subtitle: string
      options: string[]
      other: {
        label: string
        placeholder: string
      }
    }
    foodPreferences: {
      title: string
      subtitle: string
      options: string[]
      other: {
        label: string
        placeholder: string
      }
    }
    submit_button: string
    success_message: string
    error_message: string
  }
  contact: {
    title: string
    details: Record<string, {email: string; phone: string}>
    thanks_text: string
    thanks_image: string
  }
  footer: {
    year: string
    credits: string
  }
}

export interface TimelineEvent {
  time: string
  event: string
  description: string
  long_description: string
  icon: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface AccommodationOption {
  name: string
  type: string
  address: string
  distance: string
  distance_km: number
  price: string
  price_val: number
  price_range: string
  phone: string
  website: string
}

export interface SiteSettings {
  coupleNames: {
    groom: string
    bride: string
  }
  weddingDate: string
  heroTagline: string
  heroImage: SanityImageSource
  colors: {
    primary: string
    background: string
    surface: string
    textPrimary: string
    textSecondary: string
  }
  navbar: {
    links: Array<{label: string; href: string}>
  }
  countdownLabels: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
  sectionTitles: {
    timeline: string
    faq: string
  }
  footer: {
    credits: string
  }
}

export interface ChiSiamoData {
  title: string
  subtitle: string
  text: string
  badge: string
  image: SanityImageSource
}

export interface LocationData {
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  image: SanityImageSource
  googleMapsUrl: string
  description: string
}

export interface ChiesaData {
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  image: SanityImageSource
  googleMapsUrl: string
  description: string
  gallery: GalleryData[]
}

export interface ListaNozzeData {
  title: string
  message: string
  iban: string
  beneficiary: string
}

export interface MenuData {
  title: string
  sections: Array<{
    name: string
    items: string[]
  }>
}

export interface DressCodeData {
  title: string
  code: string
  description: string
  paletteLabel: string
  avoidLabel: string
  suggestedColors: Array<{
    name: string
    hex: string
  }>
  avoidColors: string[]
}

export interface AccommodationData {
  title: string
  subtitle: string
  options: AccommodationOption[]
}

export interface ContactPerson {
  email: string
  phone: string
  _type: string
}

export interface ContactSettingsData {
  contacts: ContactPerson[]
  rsvpDeadline: string
  successMessage: string
  thanksText: string
  thanksImage: SanityImageSource
  rsvpLabels: {
    title: string
    nameLabel: string
    surnameLabel: string
    attendanceLabel: string
    allergensTitle: string
    foodPreferencesTitle: string
    submitButton: string
  }
}

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}
