// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    secure: true,
    cloud_name: 'dbvtufrmp'
});

// Log the configuration
console.log(cloudinary.config());


/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result.public_id;
    } catch (error) {
        console.error(error);
    }
};


const createImageUrl = (publicId) => {
    // Create an image tag with transformations applied to the src URL
    let imageUrl = cloudinary.url(publicId, {
        transformation: [
            { width: 1200, crop: "scale" },
            {
                overlay: {
                    font_family: "Roboto Slab", font_size: 48, 
                    text: "First Name Last Name",
                    
                }, width: 771, gravity: "west", crop: "fit", x: 230, y: -30, color: "#112378"
            },
            {
                overlay: {
                    font_family: "Roboto Mono", font_size: 40, 
                    text: "Conference Attendee",
                    
                }, gravity: "west", crop: "fit", x: 480, y: 50, color: "#112378"
            },
            {
                overlay: {
                    font_family: "Roboto Mono", font_size: 48, 
                    text: "#001",
                    
                }, gravity: "south_east", crop: "fit", x: 100, y: 80, color: "#112378", angle: 90
            },
            { 
                overlay: {
                    url: "https://cascadiajs.com/_public/images/speakers/henri-helvetica-eaa1936218.jpg"
                }, width: 197, radius: "max", x: -264, y: 135
            }
        ]
    })

    return imageUrl;
};


//////////////////
//
// Main function
//
//////////////////
(async () => {

    // Set the image to upload
    //const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

    // Upload the image
    //const publicId = await uploadImage(imagePath);

    // Get the colors in the image
    //const colors = await getAssetInfo('social-sharing-card');

    // Create an image tag, using two of the colors in a transformation
    const imageUrl = await createImageUrl('cascadiajs-ticket-2024');

    // Log the image tag to the console
    console.log(imageUrl);

})();
