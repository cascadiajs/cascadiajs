import { sponsors } from '../../../../shared/data/sponsors.mjs'

export async function get({pathParameters, query, path}) {
  const { slug } = pathParameters
  const { social } = query

  const sponsor = sponsors['2024'].find(s => s.id === slug)
  // set social sharing info
  const sharing = {
    social,
    title: sponsor.name,
    image: '/_public/images/sponsors/' + sponsor.logoSquare,
    description: `Thank you for supporting our mission to inspire and educate developers in the Pacific Northwest! 🌲❤️`,
    sharingTitle: 'CascadiaJS 2024 | Sponsor | ' + sponsor.name,
    sharingImage: '/_public/images/sharing' + path + '.png',
    sharingDescription: `Thanks for sponsoring CascadiaJS 2024!`
  }
  return {
    json: {
      path,
      sponsor,
      sharing
    },
  }
}
