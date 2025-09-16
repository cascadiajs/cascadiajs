export async function get({ query, path}) {
  const { social } = query
  const sharing = {
    social,
    title: 'CascadiaJS 2026',
    image: '/_public/images/past/cjs19-family-photo.jpg',
    description: 'Coming up on June 25 - 26, 2026 in Seattle, WA!',
    sharingTitle: 'CascadiaJS 2026 | June 25 - 26 | Seattle, WA',
    sharingImage: '/_public/images/2026/social-sharing-general.png',
    sharingDescription: 'CascadiaJS 2026 is coming up June 25 - 26 in Seattle, WA!'
  }

  return {
    json: {
      path,
      /*talks,*/
      sharing,
      /*attendees,
      organizers: organizers["2025"],*/
      year: 2026,
    },
  };
}
