import { IsDateString, IsOptional, IsString, Length } from "class-validator";

export class CreateAlunoDto {
	@IsString()
	nome: string;

	@IsString()
	matricula: string;

	@IsString()
	turma: string;

	@IsDateString()
	dataNascimento: Date;

	@IsString()
	@Length(11, 11)
	cpf: string;

	@IsOptional()
	@IsString()
	telefone?: string;

	@IsOptional()
	@IsString()
	endereco?: string;
}
