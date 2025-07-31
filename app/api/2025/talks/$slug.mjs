//import { findEvent } from "../../../../shared/data/events.mjs"
//import { findTalk } from "../../../../shared/data/talks.mjs"
import talks from "../../../../shared/data/2025/talks.json" assert { type: "json" }
import cloudinary from 'cloudinary'

// Return "https" URLs by setting secure: true
cloudinary.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const createImageUrl = ({ profileImage, fullName }) => {
  console.log(profileImage, fullName)
    let imageUrl = cloudinary.v2.url("social-speaker-template-2025", {
        transformation: [
            { width: 1630, crop: "scale" },
            {
                overlay: {
                    font_family: "Roboto Mono", font_size: 88, font_style: "bold",
                    text: fullName.toUpperCase(),

                }, width: 530, gravity: "west", crop: "fit", x: 120, y: 410, color: "#112378"
            },
            {
                overlay: {
                    url: profileImage
                }, width: 846, x: 0, y: -246
            }
        ]
    })

    return imageUrl;
};

export async function get({pathParameters, query, path}) {
  const { slug } = pathParameters
  const { social, image } = query
  // get talk
  const talk = talks.find(t => t.slug === slug)
  if (!talk) {
    return {
      status: 404,
      json: { error: 'Talk not found' }
    }
  }
  else if (image !== undefined) {
    const location = createImageUrl({ profileImage: `https://cascadiajs.com${talk.speaker.image}`, fullName: talk.speaker.name })
    return {
      location
    }
  }

  // set social sharing info
  const sharing = {
    social,
    title: talk.speaker.name,
    image: '/_public/images/speakers/' + talk.speaker.image,
    description: talk.title,
    sharingTitle: 'CascadiaJS 2025 | Speakers | ' + talk.speaker.name,
    //sharingImage: '/_public/images/sharing' + path + '.png',
    //sharingImage: `/_public/images/2025/social/social-speaker-${talk.speaker.slug}.png`,
    sharingImage: `/2025/talks/${talk.slug}?image`,
    sharingDescription: talk.short || talk.description
  }
  return {
    json: {
      path,
      talk,
      sharing
    },
  }
}
