export const logoUrl =
  'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_logo.svg'
export const classicCanUrl =
  'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_can.webp'
export const bannerUrl =
  'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull-home-banner.jpeg'

export const drinks = [
  {
    id: 'original',
    name: 'Red Bull Energy Drink',
    kicker: 'The original Red Bull',
    shortLabel: 'Original',
    image: classicCanUrl,
    flavor: 'Original formula',
    accent: '#f4f7ff',
    surface: '#ffffff',
    text: '#09162e',
    description:
      'Sharp, iconic, and instantly recognizable. The classic can sets the tone for the entire story.',
    stage: { x: -16, y: -2, scale: 1.04, rotate: -5 },
  },
  {
    id: 'sugarfree',
    name: 'Red Bull Sugarfree',
    kicker: 'Wiiings without sugar',
    shortLabel: 'Sugarfree',
    image:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_suger_free.webp',
    flavor: 'Sugarfree',
    accent: '#1aa3e0',
    surface: '#0fa2dc',
    text: '#f8fcff',
    description:
      'Bright cyan visuals with a cleaner, sharper tone for a lighter but still high-energy sequence.',
    stage: { x: 18, y: -7, scale: 1.1, rotate: 2 },
  },
  {
    id: 'pink',
    name: 'The Pink Edition',
    kicker: 'Wiiings for every taste',
    shortLabel: 'Pink',
    image:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_pink-eidition.webp',
    flavor: 'White Peach',
    accent: '#e84494',
    surface: '#d33e82',
    text: '#fff6fb',
    description:
      'A more playful color burst with a more fashion-led palette and a taller, editorial composition.',
    stage: { x: -24, y: 10, scale: 0.97, rotate: -7 },
  },
  {
    id: 'yellow',
    name: 'The Yellow Edition',
    kicker: 'Tropical energy',
    shortLabel: 'Yellow',
    image:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_yellow_eidition.webp',
    flavor: 'Tropical',
    accent: '#ffd328',
    surface: '#f6c500',
    text: '#08162a',
    description:
      'The closing act turns sunny and bold, with the can scaling down into a cleaner premium finish.',
    stage: { x: 10, y: 16, scale: 0.9, rotate: 6 },
  },
]
