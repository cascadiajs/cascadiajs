import cloudinary from 'cloudinary'

// Return "https" URLs by setting secure: true
cloudinary.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});

const createImageUrl = ({ profile_image, full_name, ticket_type, ticket_number }) => {
    let imageUrl = cloudinary.v2.url("cascadiajs-ticket-2024", {
        transformation: [
            { width: 1200, crop: "scale" },
            {
                overlay: {
                    font_family: "Roboto Slab", font_size: 48, 
                    text: full_name,
                    
                }, width: 771, gravity: "west", crop: "fit", x: 230, y: -30, color: "#112378"
            },
            {
                overlay: {
                    font_family: "Roboto Mono", font_size: 40, 
                    text: ticket_type,
                    
                }, gravity: "west", crop: "fit", x: 480, y: 50, color: "#112378"
            },
            {
                overlay: {
                    font_family: "Roboto Mono", font_size: 48, 
                    text: ticket_number,
                    
                }, gravity: "south_east", crop: "fit", x: 100, y: 80, color: "#112378", angle: 90
            },
            { 
                overlay: {
                    url: profile_image
                }, width: 197, radius: "max", x: -264, y: 135
            }
        ]
    })

    return imageUrl;
};



export async function get({ query }) {
  // get user_id
  const { user_id } = query
  // fetch user info from db
  const profile_image = "https://cascadiajs.com/_public/images/speakers/henri-helvetica-eaa1936218.jpg"
  const full_name = "Henri Helvetica"
  const ticket_type = "Conference Speaker"
  const ticket_number = "#" + (9).toString().padStart(4, '0')
  // pass profile_image, full_name, ticket_type and ticket_number
  const location = createImageUrl({ profile_image, full_name, ticket_type, ticket_number })
  return {
    location
  }
}