import { Static, Type } from "@sinclair/typebox";

export const ImageRequestSchema = Type.Object({
    body: Type.Object({
        image_name: Type.String(),
        image_file: Type.String()
      }),
    response: Type.Object({
        200: Type.Null(), // Use Type.Null for an empty response body
    }),
});

export const UserLoginSchema = Type.Object({
        email: Type.String(),
        password: Type.String()
});
export type LogInSchemaBody = Static<typeof UserLoginSchema>;

export const UserSignUpSchema = Type.Object({
    full_name: Type.String(),
    email: Type.String(),
    password: Type.String(),
});
export type SignUpSchemaBody = Static<typeof UserSignUpSchema>;
