import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import dotenv from "dotenv";
import { productRouter } from "./routes/product.route.js";
dotenv.config();

const app = express();
const { PORT } = process.env;

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
	res.send("Hello World!!!!");
});
app.get("/test", (req, res) => res.send("Server is reaching this point!"));

app.listen(PORT, () => {
	console.info(`Server listening on port http://localhost:${PORT}`);
});
