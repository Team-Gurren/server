import { HttpException } from "@nestjs/common";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function invariant(condition: any, message?: string) {
	if (condition) {
		return;
	}
	// throw new Error(message || "Invariant failed");
	throw new HttpException(message || "Invariant failed", 500);
}
