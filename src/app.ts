import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "../src/app/routes/index";
import { notFound } from "./app/middlewares/not-found";
import globalErrorHandler from "./app/middlewares/error";

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
  res.send("Hello from TOURIZTO server");
});

app.use(notFound);

app.use(globalErrorHandler);


export default app;
