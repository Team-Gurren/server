import { IsArray, IsNotEmpty } from "class-validator";

export class CreateAlmocoDto {
	@IsArray()
	@IsNotEmpty()
	vendings: Array<{ id: number; quantity: number }>;
}
