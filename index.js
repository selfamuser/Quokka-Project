import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import connectDatabase from "./configuration/databaseConfiguration.js";
import articleRouter from "./routes/articleRoutes.js";
import userRouter from "./routes/userRoutes.js";
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database Connection method invoked here.
connectDatabase();

//Routes of user and article
app.use("/api/v1/user", userRouter);
app.use("/api/v1/article", articleRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Our server is running on Port ${PORT}`);
});
