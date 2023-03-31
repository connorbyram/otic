const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { S3_REGION, S3_BUCKET } = process.env;

const s3Client = new S3Client({ region: S3_REGION });

module.exports = async function deleteS3Object(imageUrl) {
    const url = require('url');
    const parsedUrl = url.parse(imageUrl);
    const key = imageUrl.replace('https://s3-us-west-1.amazonaws.com/otic/', '');
    const params = {
        Bucket: S3_BUCKET,
        Key: key
    };

    try {
        await s3Client.send(new DeleteObjectCommand(params));
        console.log(`Successfully deleted file from S3: ${key}`);
    } catch (err) {
        console.error(`Error deleting file from S3: ${err}`);
    }
}
