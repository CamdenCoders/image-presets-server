import { FastifyInstance } from "fastify";
import UserController from "../controller/user.controller";

export function userRoutes(server: FastifyInstance) {
  const userController = new UserController(server);
  server.post("/user/login", userController.logIn.bind(userController));
  server.post("/user/signup", userController.signUp);
  server.get("/user/details", userController.getDetails.bind(userController));
}
