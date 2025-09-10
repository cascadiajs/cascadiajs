export async function get({ path, query }) {
  const { social } = query
  
  // Set social sharing info for the connect page
  const sharing = {
    social,
    title: 'Cascadia Connect - CascadiaJS 2025',
    image: '/_public/images/2025/social-sharing-general.png',
    description: 'Low-pressure ways to meet cool humans at CascadiaJS. Pair programming, Birds of a Feather tables, conversation starters, and more!',
    sharingTitle: 'Cascadia Connect | CascadiaJS 2025',
    sharingImage: '/_public/images/2025/social-sharing-general.png',
    sharingDescription: 'Low-pressure ways to meet cool humans at CascadiaJS. Join us for pair programming, Birds of a Feather tables, and more!'
  }

  return {
    json: {
      path,
      sharing,
      year: 2025,
    },
  };
}

