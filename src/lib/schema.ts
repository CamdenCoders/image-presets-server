import { Static, Type } from "@sinclair/typebox";

export const ImageUploadSchema = Type.Object({
  image_file: Type.String({ format: "binary" }),
  image_name: Type.String(),
});
export type ImageUploadBody = Static<typeof ImageUploadSchema>;

export const UserLoginSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});
export type LogInSchemaBody = Static<typeof UserLoginSchema>;

export const UserSignUpSchema = Type.Object({
  full_name: Type.String(),
  email: Type.String(),
  password: Type.String(),
});
export type SignUpSchemaBody = Static<typeof UserSignUpSchema>;

export const loginPayloadSchema = Type.Object({
  full_name: Type.String(),
  email: Type.String(),
  user_id: Type.String(),
});
export type LoginPayload = Static<typeof loginPayloadSchema>;
