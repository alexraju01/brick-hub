import type { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
	console.info("Fetching products from Rebrickable...");
	const LEGO_API = process.env.LEGO_API;
	const API_KEY = process.env.REBRICKABLE_API_KEY;
	try {
		const response = await fetch(`${LEGO_API}lego/sets`, {
			headers: { Authorization: `key ${API_KEY}` },
		});
		const data = await response.json();
		res.json({
			status: "success",
			data: data.results,
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		res.status(500).json({ status: "error", message: message });
	}
};
