import z from "zod";

export const signupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const signinSchema = z.object({
  usernam: z.string(),
  paasword: z.string(),
});
