import { raw, Router } from "express";
import { signinSchema, signupSchema } from "../../../../zod";
import { db } from "../../../../db";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const rawdata = req.body;

  if (signupSchema.safeParse(rawdata).error) {
    res.json({
      success: false,
      message: "invalid payload",
    });
    return;
  }

  const newUser = await db.user.create({
    data: {
      email: rawdata.email,
      password: rawdata.password,
      username: rawdata.username,
    },
  });

  res.json({
    success: true,
    userId: newUser.id,
    message: "user created",
  });

  return;
});

userRouter.post("/signin", async (req, res) => {
  const rawdata = req.body;
  if (signinSchema.safeParse(rawdata).error) {
    res.json({
      success: false,
      message: "invalid payload",
    });
    return;
  }

  const user = await db.user.findFirst({
    where: {},
  });
});
