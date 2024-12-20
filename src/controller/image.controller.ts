import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

class ImageController {
  private server: FastifyInstance;
  constructor(server: FastifyInstance) {
    this.server = server;
  }
  async setImageData(req: FastifyRequest, reply: FastifyReply) {
    
  }
}
export default ImageController;
