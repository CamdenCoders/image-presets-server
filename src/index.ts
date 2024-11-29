import "reflect-metadata";
import * as dotenv from "dotenv";
import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { imageRoutes } from "./routes/images.routes";
import { userRoutes } from "./routes/user.routes";
dotenv.config();
async function startServer() {
  const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();
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
  })