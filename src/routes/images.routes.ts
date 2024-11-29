import { FastifyInstance } from "fastify";
import { ImageRequestSchema } from "../lib/schema";
import { imageController } from "../controller/image.controller";

export function imageRoutes(server: FastifyInstance) {
    server.post("/send-image-data", {schema: ImageRequestSchema}, imageController.setImageData)
} 