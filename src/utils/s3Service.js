import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: import.meta.env.VITE_APP_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
    },
});

export const uploadFileToS3 = async (file) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    const fileBuffer = await file.arrayBuffer();

    const params = {
        Bucket: import.meta.env.VITE_APP_AWS_BUCKET_NAME,
        Key: fileName,
        Body: new Uint8Array(fileBuffer),
        ContentType: file.type,
        // ACL: 'public-read', // Commenting out ACL as it often conflicts with 'Bucket Owner Enforced' setting
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Construct the public URL
        // Format: https://{bucket}.s3.{region}.amazonaws.com/{key}
        const url = `https://${import.meta.env.VITE_APP_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_APP_AWS_REGION}.amazonaws.com/${fileName}`;
        return url;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
};
