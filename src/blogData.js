export function getBlogPath(slug) {
  return `/blogs/${slug}`
}

export const blogs = [
  {
    slug: 'why-the-original-can-still-leads-the-lineup',
    title: 'Why the original can still leads the lineup',
    category: 'Product Story',
    date: 'March 12, 2026',
    readTime: '5 min read',
    image:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull-home-banner.jpeg',
    excerpt:
      'The original can does not win by being louder. It wins by staying direct, cold, and immediately recognizable on every surface it lands on.',
    intro:
      'The original Red Bull can still sets the tone for the whole lineup because it solves the product story in one glance. Silver and blue, compact proportions, and zero visual confusion. It is not trying to look seasonal or trend-driven. It just reads fast.',
    sections: [
      {
        heading: 'Recognition is the real premium signal',
        body:
          'Most product pages overwork the first impression. The original can does the opposite. It enters the frame, holds its posture, and lets familiarity do the heavy lifting. That immediate recognition is part of why the product still feels premium.',
      },
      {
        heading: 'A stable anchor helps every flavor around it',
        body:
          'When the original can remains visually disciplined, the flavored editions get more room to differentiate. Pink, Yellow, Red, and Sugarfree all become easier to place because the original gives the range a fixed center of gravity.',
      },
      {
        heading: 'The product page should respect that restraint',
        body:
          'A good detail page for the original should feel intentional but never noisy. Large can staging, spare copy, and controlled transitions work better than stacking five unrelated sections just because space is available.',
      },
    ],
  },
  {
    slug: 'designing-a-drinks-lineup-that-feels-cohesive',
    title: 'Designing a drinks lineup that feels cohesive',
    category: 'Design',
    date: 'March 9, 2026',
    readTime: '6 min read',
    image:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_yellow_eidition.webp',
    excerpt:
      'A product family only feels premium when every can looks related without collapsing into the same exact visual note.',
    intro:
      'Lineup design gets difficult when every flavor wants to be noticed at the same time. The job is not to make every can equally loud. The job is to make each one legible inside a system.',
    sections: [
      {
        heading: 'Shared structure comes before color',
        body:
          'Cohesion starts with silhouette, crop, spacing, and motion. Color is only the most obvious difference. If the staging logic changes from can to can, the lineup starts to feel accidental.',
      },
      {
        heading: 'Each edition needs one dominant note',
        body:
          'Sugarfree owns the cooler blue lane. Pink owns softness. Yellow carries warmth. Red carries heat. When one note is clearly assigned, the page can build around that decision instead of mixing too many cues.',
      },
      {
        heading: 'Motion should unify the family',
        body:
          'The transition system matters as much as the card design. If the cans move with the same confidence and weight, the lineup reads like a brand family even when the flavor colors diverge hard.',
      },
    ],
  },
  {
    slug: 'what-makes-a-product-page-feel-fast',
    title: 'What makes a product page feel fast',
    category: 'UX',
    date: 'March 4, 2026',
    readTime: '4 min read',
    image:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_can.webp',
    excerpt:
      'Fast pages are not just about performance metrics. They also remove visual hesitation and keep the user pointed at the thing they came for.',
    intro:
      'A product page can technically load quickly and still feel slow. That usually happens when the layout asks the user to decode too many competing ideas before they reach the product itself.',
    sections: [
      {
        heading: 'Lead with the object, not the explanation',
        body:
          'If the product is the reason for the visit, the can should dominate the first meaningful screen. Supporting text can follow, but the eye should land on the object first.',
      },
      {
        heading: 'Reduce branch points',
        body:
          'Every extra button, tab, or content lane slows the page mentally. Clearer layouts feel faster because they remove decision friction and let the user keep moving.',
      },
      {
        heading: 'Use motion for direction, not decoration',
        body:
          'Good transitions help the page feel deliberate. Bad transitions feel like waiting. The difference is whether the motion explains the structure or simply occupies time.',
      },
    ],
  },
  {
    slug: 'from-sugarfree-to-watermelon-how-flavor-changes-mood',
    title: 'From Sugarfree to Watermelon: how flavor changes mood',
    category: 'Flavor Notes',
    date: 'February 27, 2026',
    readTime: '5 min read',
    image:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_red_eidition.webp',
    excerpt:
      'Flavor does not just shift taste. It changes the emotional temperature of the page, the product photo, and the user expectation around the can.',
    intro:
      'Different editions ask the interface to do different things. Sugarfree wants a colder, cleaner stage. Watermelon can handle more heat. White Peach can support softer transitions without losing energy.',
    sections: [
      {
        heading: 'Sugarfree needs clarity',
        body:
          'The sugarfree can works best when the layout feels crisp and bright. Too much warmth around it weakens the product read and blurs the difference from the original.',
      },
      {
        heading: 'Red can take more drama',
        body:
          'The red edition can absorb stronger contrast, richer surfaces, and more aggressive framing. That does not mean chaos. It means the page can push harder without looking mismatched.',
      },
      {
        heading: 'Flavor should shape supporting copy',
        body:
          'Even short supporting text can reinforce taste mood. Cooler editions read better with cleaner language. Warmer editions can tolerate slightly bolder phrasing and richer imagery.',
      },
    ],
  },
  {
    slug: 'building-a-better-promo-story-with-less-copy',
    title: 'Building a better promo story with less copy',
    category: 'Content',
    date: 'February 19, 2026',
    readTime: '7 min read',
    image:
      'https://redbull-promotional.s3.ap-south-1.amazonaws.com/redbull_pink-eidition.webp',
    excerpt:
      'Shorter product writing usually performs better when the visuals already carry the identity. The page should not narrate what the can already says clearly.',
    intro:
      'Product storytelling gets stronger when copy knows its role. It should sharpen the product read, not compete with it. That is especially true on promotional pages where the can itself is the hero asset.',
    sections: [
      {
        heading: 'Write for the scan first',
        body:
          'Most users do not read in order. They scan headings, metadata, and buttons. Strong blog and product layouts accept that pattern and build for it instead of pretending every paragraph gets full attention.',
      },
      {
        heading: 'Keep the headline specific',
        body:
          'Vague language makes polished design feel hollow. If the page is about the original can, say that. If it is about Sugarfree, name the exact variant and the exact distinction.',
      },
      {
        heading: 'Let the visuals finish the sentence',
        body:
          'The best copy often stops early. Once the can, color, and motion are carrying the idea, text should get out of the way and leave the user with one clear product memory.',
      },
    ],
  },
]
