import { getBaseUrl } from '../shared/utils/base-url.mjs'

export default function Head(state) {
  const { store, req } = state
  const { sharing = {} } = store
  const baseUrl = getBaseUrl(req)
  //console.log(sharing)
  const title = sharing.sharingTitle || "CascadiaJS - a JS conf for the PacNW"
  const description = sharing.sharingDescription || "CascadiaJS 2025 is coming up on September 19 - 22 in Seattle, WA!"
  const image = sharing.sharingImage || "/_public/images/2025/social.png"
  const path = sharing.sharingPath || req.path

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XBTPEH9RZW"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-XBTPEH9RZW');
      </script>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${ title }</title>
      <link rel="icon" href="/_public/favicon.svg">
      <link rel="stylesheet" href="https://use.typekit.net/nln6hzq.css">
      <link rel="stylesheet" href="/_public/styles/main.css">
      <meta name="description" content="${ description }">
      <meta property="og:description" content="${ description }" />
      <meta name="image" property="og:image" content="${ baseUrl }${ image }" />
      <meta name="url" property="og:url" content="${baseUrl}${ path }" />
      <meta name="type" property="og:type" content="website" />
      <meta name="author" content="CascadiaJS">
      <meta property="og:title" content="${ title }" />
      <meta name="twitter:image" content="${ baseUrl }${ image }">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:site" content="@cascadiajs">
      <meta name="twitter:title" content="${ title }">
    </head>
`;
}
