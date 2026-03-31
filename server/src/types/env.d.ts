declare namespace NodeJS {
	interface ProcessEnv {
		readonly PORT: string;
		readonly REBRICKABLE_API_KEY: string;
	}
}
