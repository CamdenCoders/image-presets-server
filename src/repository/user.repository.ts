import { hashPassword, verifyPassword } from "../utils/user.utils";
import { LoginPayload, LogInSchemaBody, SignUpSchemaBody } from "../lib/schema";
import { db } from "../database/database";
import { sql } from "kysely";

export class UserRepository {
  async logIn(loginDetails: LogInSchemaBody): Promise<LoginPayload> {
    loginDetails.email = loginDetails.email.trim();
    const userExists = await db
      .selectFrom("user")
      .select(["password", "email", "user_id"])
      .where("email", "=", loginDetails.email)
      .executeTakeFirst();

    if (!userExists) {
      throw new Error("Invalid credentials");
    }
    if (!(await verifyPassword(loginDetails.password, userExists.password))) {
      throw new Error("Invalid credentials");
    }
    const payload = {
      user_id: userExists.user_id.toString(),
      email: userExists.email,
      full_name: userExists.email,
    };
    return payload;
  }

  async signUp(userDetails: SignUpSchemaBody): Promise<void> {
    const { email, password, full_name } = userDetails;
    const hashedPassword = await hashPassword(password);
    try {
      const userExists = await db
        .selectFrom("user")
        .select("email")
        .where("email", "=", userDetails.email)
        .executeTakeFirst();

      if (userExists)
        throw new Error("User with email already exists, try logging in");

      await db
        .insertInto("user")
        .values({
          email,
          password: hashedPassword,
          full_name,
        })
        .execute();
    } catch (error) {
      console.error("Error during user sign-up:", error);
      throw new Error("Not able to sign up. Try again");
    }
  }

  async getDetails(user_id: any) {
    try {
      const result = await db
        .selectFrom("user")
        .leftJoin("images", "user.user_id", "images.user_id")
        .select([
          "user.full_name",
          db.fn
            .coalesce(db.fn.count("images.image_id"), sql.val(0))
            .as("image_count"),
        ])
        .where("user.user_id", "=", user_id)
        .groupBy("user.user_id")
        .executeTakeFirstOrThrow();
      return result;
    } catch (error) {
      console.error("Error while retrieving details", error);
      throw new Error("Not able to fetch user details");
    }
  }
}

export const userRepository = new UserRepository();
