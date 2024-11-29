import { FastifyInstance } from "fastify";
import { userController } from "../controller/user.controller";
import { UserLoginSchema } from "../lib/schema";

export function userRoutes(server: FastifyInstance) {
    server.post("/login", userController.logIn)
    server.post("/signup", userController.signUp)
}