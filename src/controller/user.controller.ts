import { FastifyReply, FastifyRequest } from "fastify";
import { LogInSchemaBody, SignUpSchemaBody } from "../lib/schema";
import { userRepository } from "../repository/user.repository";

class UserController {
  async logIn(
    req: FastifyRequest<{ Body: LogInSchemaBody }>,
    reply: FastifyReply
  ) {
    try {
      await userRepository.logIn(req.body);
      reply.status(200).send();
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
}

export const userController = new UserController();
