//import { getStyles } from "@enhance/arc-plugin-styles";
//const { linkTag } = getStyles;
// ${linkTag()}

export default function Head() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>CascadiaJS - a JS conf for the PacNW</title>
      <link rel="icon" href="/_public/favicon.svg">
      <link rel="stylesheet" href="https://use.typekit.net/nln6hzq.css">
      <link rel="stylesheet" href="/_public/styles/main.css">
      <meta name="description" content="CascadiaJS 2024 is coming up on June 19 - 22 in Seattle, WA!">
      <meta property="og:description" content="CascadiaJS 2024 is coming up on June 19 - 22 in Seattle, WA!" />
      <meta name="image" property="og:image" content="https://cascadiajs.com/_public/splash.png" />
      <meta name="url" property="og:url" content="https://cascadiajs.com" />
      <meta name="type" property="og:type" content="website" />
      <meta name="author" content="Carter Rabasa">
      <meta property="og:title" content="CascadiaJS - a JS conf for the PacNW" />
      <meta name="twitter:image" content="https://cascadiajs.com/_public/splash.png">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:site" content="@cascadiajs">
      <meta name="twitter:title" content="CascadiaJS - a JS conf for the PacNW">
    </head>
`;
}
