import { FastifyInstance } from "fastify";
import ImageController from "../controller/image.controller";

export function imageRoutes(server: FastifyInstance) {
  const imageController = new ImageController(server);
  server.post(
    "/images/upload",
    imageController.uploadImage.bind(imageController)
  );
  server.get("/images", imageController.getImages.bind(imageController));
}
