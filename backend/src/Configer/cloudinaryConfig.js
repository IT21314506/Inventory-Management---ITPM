const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: 'ds1cv5yjs',
    api_key: '188247681797556',
    api_secret: 'rBS4EbYu6zefmx62zczIQnPE6w8',
});

const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { timeout: 60000 },
            (error, result) => {
                if (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                    reject(new Error('Failed to upload image to Cloudinary: ' + error.message));
                } else {
                    resolve(result);
                }
            }
        );
        
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
};

module.exports = { uploadImageToCloudinary };
