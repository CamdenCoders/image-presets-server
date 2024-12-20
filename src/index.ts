import "reflect-metadata";
import * as dotenv from "dotenv";
import Fastify, { fastify, FastifyReply, FastifyRequest } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { imageRoutes } from "./routes/images.routes";
import { userRoutes } from "./routes/user.routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyAuth from "@fastify/auth";
import cors from "@fastify/cors";

dotenv.config();
async function startServer() {
  const server = fastify();
  await server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "",
  });
  server.register(fastifyAuth);
  await server.register(cors, {
    origin: "http://localhost:3000", // Replace with the origin you want to allow
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // If using cookies or credentials
  });
  await server.register(fastifyCookie, {
    secret: "obiwankenobi",
    hook: "preHandler",
  });

  // server.decorate(
  //   "authenticate",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     try {
  //       await request.jwtVerify();
  //     } catch (error) {
  //       reply.send(error);
  //     }
  //   }
  // );

  // server.addHook("preHandler", (request: FastifyRequest, reply, next) => {
  //   request.jwt = server.jwt;
  //   return next();
  // });

  imageRoutes(server);
  userRoutes(server);
  const { PORT = "8080" } = process.env;
  await server.listen({ port: parseInt(PORT) });
}
startServer()
  .then(() => {
    console.log(`Server started successfully at ${process.env.PORT}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
