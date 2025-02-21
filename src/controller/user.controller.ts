import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { LogInSchemaBody, SignUpSchemaBody } from "../lib/schema";
import { userRepository } from "../repository/user.repository";

class UserController {
  private server: FastifyInstance;

  constructor(server: FastifyInstance) {
    this.server = server; // Inject the Fastify instance
  }
  async logIn(
    req: FastifyRequest<{ Body: LogInSchemaBody }>,
    reply: FastifyReply
  ) {
    try {
      const payload = await userRepository.logIn(req.body);
      const token = this.server.jwt.sign(payload);
      reply.setCookie("access_token", token, {
        path: "/",
        httpOnly: true,
        secure: true,
      });
      reply.status(200).send(token);
    } catch (error) {
      reply.status(403).send(error);
    }
  }

  async signUp(
    req: FastifyRequest<{ Body: SignUpSchemaBody }>,
    reply: FastifyReply
  ) {
    try {
      const response = await userRepository.signUp(req.body);
      reply.status(200).send(response);
    } catch (error) {
      reply.status(500).send(error);
    }
  }

  async getDetails(req: FastifyRequest, reply: FastifyReply) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return reply.status(401).send({ error: "Token not found" });
      }
      //console.log("Extracted Token:", token);
      const decoded: any = this.server.jwt.verify(token!); // Verify and decode JWT

      const response = await userRepository.getDetails(decoded.user_id);
      reply.status(200).send(response);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
}

export default UserController;
