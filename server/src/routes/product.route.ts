import { Router } from "express";
import { getAllProducts } from "../controller/product.controller.js";

export const productRouter = Router();

productRouter.route("/").get(getAllProducts);
