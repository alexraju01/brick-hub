import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const { PORT } = process.env;

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hello World!!!!");
});

app.listen(PORT, () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
});
