import { PartialType } from "@nestjs/mapped-types";
import { CreateAlunoDto } from "./create-aluno.dto";
import { IsDateString, IsOptional, IsString, Length } from "class-validator";

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
	@IsOptional()
	@IsString()
	nome?: string;

	@IsOptional()
	@IsDateString()
	dataNascimento?: Date;

	@IsOptional()
	@IsString()
	telefone?: string;

	@IsOptional()
	@IsString()
	endereco?: string;
}
