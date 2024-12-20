import { hashPassword, verifyPassword } from "../utils/user.utils";
import { LoginPayload, LogInSchemaBody, SignUpSchemaBody } from "../lib/schema";
import { db } from "../database/database";

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
}

export const userRepository = new UserRepository();
