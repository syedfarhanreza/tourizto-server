import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "../src/app/routes/index";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);
app.get("/", async (req, res) => {
  res.send("Hello from server");
});



export default app;
