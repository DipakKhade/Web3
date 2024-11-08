import express from "express";
import cors from "cors";
import { router } from "./api/v1";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v2", router);

app.listen(3000, () => console.log("http server is up"));
