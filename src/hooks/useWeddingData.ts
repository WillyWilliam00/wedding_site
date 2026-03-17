import { useSuspenseQuery } from '@tanstack/react-query'
import { client } from '../lib/sanityClient'
import type { SanityWeddingData } from '../types/wedding'

export function useWeddingData() {
  return useSuspenseQuery<SanityWeddingData>({
    queryKey: ['weddingData'],
    queryFn: async () => {
      const query = `{
        "siteSettings": *[_type == "siteSettings"][0],
        "timeline": *[_type == "timelineEvent"] | order(time asc) {
          ...,
          "long_description": longDescription
        },
        "faq": *[_type == "faq"],
        "location": *[_type == "location"][0],
        "gallery": *[_type == "location"][0].gallery[]{
          asset,
          alt
        },
        "chiesa": *[_type == "chiesa"][0],
        "listaNozze": *[_type == "listaNozze"][0],
        "chiSiamo": *[_type == "chiSiamo"][0],
        "dressCode": *[_type == "dressCode"][0],
        "accommodation": *[_type == "accommodation"][0],
        "contactSettings": *[_type == "contactSettings"][0],
        "menu": *[_type == "menu"][0]
      }`
      const data = await client.fetch(query)
      return data
    },
  })
}
