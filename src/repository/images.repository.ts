import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { db } from "../database/database";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

export class ImageRepository {
  async upload(filename: string, user_id: string) {
    //const image_name = imageContents.image_name as string;
    const fileContent = fs.readFileSync(`./uploads/${filename}`);

    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    try {
      const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `uploads/${filename}`,
        Body: fileContent,
        ContentType: "image/jpeg",
      };

      const upload = new Upload({
        client: s3,
        params,
      });

      upload.on("httpUploadProgress", (progress) => {
        console.log(`Uploaded ${progress.loaded} of ${progress.total} bytes`);
      });

      const result = await upload.done();
      console.log("File uploaded successfully!");

      const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${filename}`;
      //console.log("File URL:", fileUrl);
      await db
        .insertInto("images")
        .values({
          image_name: filename,
          user_id: user_id,
          image_url: fileUrl,
        })
        .execute();
      // Delete file from server
      //await unlinkAsync(`./uploads/${filename}`);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  async getImages(user_id: string) {
    const result = await db
      .selectFrom("images")
      .select(["image_name", "image_id", "image_url"])
      .where("user_id", "=", user_id)
      .execute();

    return result;
  }
}
export const imageRepository = new ImageRepository();
