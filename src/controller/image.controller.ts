import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { imageRepository } from "../repository/images.repository";
import { Multipart } from "@fastify/multipart";
const pump = promisify(pipeline);

class ImageController {
  private server: FastifyInstance;
  constructor(server: FastifyInstance) {
    this.server = server;
  }
  async uploadImage(req: FastifyRequest, reply: FastifyReply) {
    try {
      // Decode user token
      //console.log("Headers:", req.headers);
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return reply.status(401).send({ error: "Token not found" });
      }
      //console.log("Extracted Token:", token);
      const decoded: any = this.server.jwt.verify(token!); // Verify and decode JWT

      // console.log("Decoded Token:", decoded);
      // console.log("User ID:", decoded.user_id); // <-- Access user_id here

      if (!req.isMultipart()) {
        return reply.status(400).send({ error: "Request is not multipart" });
      }
      // Get uploaded file
      const data = await req.file();
      console.log(req);
      //const parts = req.parts();
      if (!data) {
        return reply.status(400).send({ error: "File is required" });
      }

      // Extract filename and file stream
      const { filename, file } = data;
      const storedFilePath = `./uploads/${filename}`;
      const storedFile = fs.createWriteStream(storedFilePath);

      await pump(file, storedFile);

      // Store metadata in database
      await imageRepository.upload(filename, decoded.user_id);

      return reply.status(200).send({ message: "Upload successful", filename });
    } catch (error) {
      console.error("Error uploading file:", error);
      return reply.status(500).send({ error: "File upload failed" });
    }
  }
  async getImages(req: FastifyRequest, reply: FastifyReply) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return reply.status(401).send({ error: "Token not found" });
      }
      //console.log("Extracted Token:", token);
      const decoded: any = this.server.jwt.verify(token!); // Verify and decode JWT
      const response = await imageRepository.getImages(decoded.user_id);
      return reply.status(200).send(response);
    } catch (error) {
      console.error("Error fetching images:", error);
      return reply.status(500).send({ error: "image fetch failed" });
    }
  }
}
export default ImageController;
