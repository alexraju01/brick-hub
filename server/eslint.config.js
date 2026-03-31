// server/eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	// 1. Global Ignores
	{
		ignores: ["dist/**", "node_modules/**", "eslint.config.js"],
	},
	// 2. Base JS Recommended
	js.configs.recommended,
	// 3. TypeScript Recommended (using spread operator)
	...tseslint.configs.recommended,
	// 4. Custom Server Rules & Language Options
	{
		files: ["**/*.ts"], // Target only TS files for these options
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// --- ASYNC & SAFETY ---
			// Ensures promises are awaited to prevent unhandled rejections or silent failures
			"@typescript-eslint/no-floating-promises": "error",
			// Prevents type coercion bugs by forcing explicit checks (e.g., if (x !== 0))
			"@typescript-eslint/strict-boolean-expressions": "warn",
			// Forces '===' to avoid JavaScript's unpredictable truthy/falsy logic
			eqeqeq: ["error", "always"],

			// --- ARCHITECTURE & CODE STYLE ---
			// Standardizes on 'interface' over 'type' for models/objects
			"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
			// Separates logic from metadata by forcing 'import type' where possible
			"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
			// Ensures function outputs are predictable and documented
			"@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
			// Enforces arrow functions for function expressions
			"func-style": ["error", "expression"],
			// Ensures that arrow functions are used as callbacks (like in .map or .filter)
			"prefer-arrow-callback": ["error", { allowNamedFunctions: false }],

			// --- VARIABLE MANAGEMENT ---
			// Prevents local variables from sharing names with outer scopes
			"@typescript-eslint/no-shadow": "error",
			// Warns on unused variables to keep code clean, but allows 'any' for flexibility
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "off",

			// --- READABILITY & MAINTENANCE ---
			// Discourages random numbers; allows common HTTP codes and basic indexes
			"no-magic-numbers": [
				"warn",
				{ ignore: [0, 1, 200, 400, 404, 500], ignoreArrayIndexes: true },
			],
			// Allows console logs since this is a server-side environment
			// --- LOG MANAGEMENT ---
			// Disallow general logging, but allow explicit error and warning signals
			"no-console": ["warn", { allow: ["warn", "info", "error"] }],
		},
	},
];
