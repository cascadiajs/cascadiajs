import { getBaseUrl } from '../shared/utils/base-url.mjs'

export default function Head(state) {
  const { store, req } = state
  const { sharing = {} } = store
  const baseUrl = getBaseUrl(req)
  //console.log(sharing)
  const title = sharing.sharingTitle || "CascadiaJS - a JS conf for the PacNW"
  const description = sharing.sharingDescription || "CascadiaJS 2025 is coming up on September 18 - 19 in Seattle, WA!"
  const image = sharing.sharingImage || "/_public/images/2025/social-sharing-general.png"
  const path = sharing.sharingPath || req.path

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XBTPEH9RZW"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-XBTPEH9RZW');
      </script>
      <!-- Meta Pixel Code -->
      <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1431763387943877');
      fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=1431763387943877&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Meta Pixel Code -->
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
      <!--script async data-uid="a08a548134" src="https://cascadiajs.kit.com/a08a548134/index.js"></script-->
    </head>
`;
}
