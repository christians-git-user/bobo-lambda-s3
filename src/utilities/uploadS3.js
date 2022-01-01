const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const uploadObjectToS3 = async (objectName, objectData) => {
    const bucketName = process.env.BUCKET;
    const params = {
        Bucket: bucketName,
        Key: objectName,
        Body: objectData
    };

    return S3.upload(params, (error, data) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log(`successfully uploaded file at ${data.Location}`)
    })
};

module.exports = Object.freeze({
    uploadObjectToS3
})