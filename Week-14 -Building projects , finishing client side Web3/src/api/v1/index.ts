import { Router } from "express";
import { userRouter } from "./Rooutes/user";

export const router = Router();

router.use("/user", userRouter);
