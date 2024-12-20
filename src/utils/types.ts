import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    user: {
      email: string;
      user_id: string;
      full_name: string;
    };
  }

  interface FastifyInstance {
    jwt: JWT;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      email: string;
      user_id: string;
      full_name: string;
    };
    user: {
      email: string;
      user_id: string;
      full_name: string;
    };
  }
}
