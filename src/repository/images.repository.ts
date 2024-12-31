import { S3Client } from "@aws-sdk/client-s3";

export class ImageRepository {
  async upload(imageContents: any, user_id: string) {
    const file = imageContents.image_file;
    const image_name = imageContents.image_name;
    console.log(image_name);
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: `./${image_name}`, // Path inside the bucket
      Body: file, // File buffer from multer
      ContentType: ".jpg", // File type
    };
  }
}
export const imageRepository = new ImageRepository();
