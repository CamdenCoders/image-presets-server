import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { imageRepository } from "../repository/images.repository";
import { ImageUploadBody } from "../lib/schema";

class ImageController {
  private server: FastifyInstance;
  constructor(server: FastifyInstance) {
    this.server = server;
  }
  async uploadImage(
    req: FastifyRequest<{ Body: ImageUploadBody }>,
    reply: FastifyReply
  ) {
    try {
      const parts = await req.file();
      const fields = parts?.fields;
      const image_name = fields?.image_name ? fields.image_name : null;

      if (!image_name) {
        return reply.status(400).send({ error: "Image name is required" });
      }

      // Extract the file
      const image_file = parts?.file;

      if (!image_file) {
        return reply.status(400).send({ error: "Image file is required" });
      }
      console.log("Image Name:", image_name);
      console.log("File Details:", image_file);
      const token: { id: string } = await req.jwtDecode();
      const user_id = token.id;
      const imageContents = {
        image_name,
        image_file,
      };
      const result = await imageRepository.upload(imageContents, user_id);
    } catch (error) {}
  }
}
export default ImageController;
