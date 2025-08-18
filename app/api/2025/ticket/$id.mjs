import cloudinary from 'cloudinary'
import { findTicket } from '../../../../shared/data/tito.mjs';
import { findUser } from '../../../../shared/data/users.mjs';

// Return "https" URLs by setting secure: true
cloudinary.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});

const createImageUrl = ({ profileImage, fullName, ticketType, ticketNumber }) => {
    let imageUrl = cloudinary.v2.url("cascadiajs-ticket-2025", {
        transformation: [
            { width: 1200, crop: "scale" },
            {
                overlay: {
                    font_family: "Roboto Slab", font_size: 48,
                    text: fullName,

                }, width: 771, gravity: "west", crop: "fit", x: 230, y: -30, color: "#112378"
            },
            {
                overlay: {
                    font_family: "Roboto Mono", font_size: 40,
                    text: ticketType,

                }, gravity: "west", crop: "fit", x: 480, y: 50, color: "#112378"
            },
            {
                overlay: {
                    font_family: "Roboto Mono", font_size: 48,
                    text: ticketNumber,

                }, gravity: "south_east", crop: "fit", x: 100, y: 80, color: "#112378", angle: 90
            },
            {
                overlay: {
                    url: profileImage
                }, width: 197, radius: "max", x: -264, y: 135
            }
        ]
    })

    return imageUrl;
};

export async function get({ query, pathParameters }) {
    const { image } = query
    const { id: ticketId } = pathParameters
    if (!ticketId) {
        return {
            status: 404
        }
    }
    else {
        // fetch user info from db
        const ticket = await findTicket({ _id: ticketId })
        //console.log(ticket)
        if (ticket) {
            const fullName = ticket.full_name
            const ticketType = ticket.release_title
            const ticketNumber = "#" + ticket.number.toString().padStart(4, '0')
            const user = await findUser({ _id: ticket.user_id })
            const profileImage = user.profile_photo
            if (image) {
                // pass profile_image, full_name, ticket_type and ticket_number
                const location = createImageUrl({ profileImage, fullName, ticketType, ticketNumber })
                return {
                    location
                }
            }
            else {
                const sharing = {
                    sharingTitle: `Join ${fullName} at CascadiaJS 2025!`,
                    sharingImage: `/ticket/${ ticketId }?image=true`,
                    sharingDescription: 'Don\'t miss CascadiaJS 2025, Sept 18 - 19 in Seattle, WA!',
                    sharingPath: '/ticket/' + ticketId
                }
                return {
                    json: {
                        fullName,
                        ticketId,
                        sharing
                    }
                }
            }
        }
        else {
            return {
                status: 404,
                json: { error: "Ticket not found" }
            }
        }
    }
}