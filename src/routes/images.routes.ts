import { FastifyInstance } from "fastify";
import { ImageRequestSchema } from "../lib/schema";
import ImageController from "../controller/image.controller";

export function imageRoutes(server: FastifyInstance) {
  const imageController = new ImageController(server);
  server.post(
    "/send-image-data",
    { schema: ImageRequestSchema },
    imageController.setImageData.bind(imageController)
  );
}
