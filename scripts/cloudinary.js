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


const createImageTag = (publicId) => {
    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId, {
        transformation: [
            { width: 1200, crop: "scale" },
            {
                overlay: {
                    font_family: "arial", font_size: 48, 
                    text: "HEADLINE HEADLINE HEADLINE HEADLINE HEADLINE HEADLINE HEADLINE HEADLINE",
                    
                }, width: 500, crop: "fit"
            },
            { 
                flags: "layer_apply", x: 300
            },
            { 
                overlay: "cfp" 
            },
            { 
                flags: "layer_apply", x: -300 
            }
        ]
    })

    return imageTag;
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
    const imageTag = await createImageTag('social-sharing-card');

    // Log the image tag to the console
    console.log(imageTag);

})();
