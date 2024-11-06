import express from "express";
import { mint_token } from "./mintToken";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.post("/helium", async (req, res) => {
  await mint_token(
    "CCbC7H2PoGj9hZ3VaUTyeJJ5SnhNbPcYdLa7nSCGQP6q",
    "C7D9BsnoDiyeLbcyTwKm2RaMcREVTM5DFh6AbZ9MYMkT",
    0.001
  );

  res.json({});
  return;
});

app.listen(PORT, () => {
  console.log(`http server is up on PORT ${PORT}`);
});
