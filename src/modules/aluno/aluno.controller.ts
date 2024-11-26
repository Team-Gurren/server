import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
	Request,
	Delete,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import { AlunoService } from "./aluno.service";
import type { CreateAlunoDto } from "./dto/create-aluno.dto";
import type { Aluno } from "./entities/aluno.entity";
import type { UpdateAlunoDto } from "./dto/update-aluno.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("aluno")
export class AlunoController {
	constructor(private readonly alunoService: AlunoService) {}

	@Get()
	async lerTodosOsAluos(): Promise<Aluno[]> {
		return await this.alunoService.lerTodoOsAlunos();
	}

	@Post()
	async cadastrarAluno(@Body() aluno: CreateAlunoDto): Promise<Aluno> {
		return await this.alunoService.cadastrarAluno(aluno);
	}

	@Patch(":id")
	async autualizarAluno(
		@Param("id") id: number,
		@Body() aluno: UpdateAlunoDto,
	): Promise<Aluno> {
		return await this.alunoService.autualizarAluno(id, aluno);
	}

	@Delete(":id")
	async deletarAluno(@Param("id") publicID: string): Promise<void> {
		return await this.alunoService.deletarAluno(publicID);
	}

	@Get("/cpf/:cpf")
	async lerAlunoViaCPF(@Param("cpf") cpf: string): Promise<Aluno> {
		return await this.alunoService.lerAlunoViaCPF(cpf);
	}

	@Get("/matricula/:matricula")
	async letAlunoViaMatricula(
		@Param("matricula") matricula: string,
	): Promise<Aluno> {
		return await this.alunoService.letAlunoViaMatricula(matricula);
	}

	@Get("/publicID/:id")
	async lerAlunoViaPublicID(@Param("id") publicID: string): Promise<Aluno> {
		return await this.alunoService.lerAlunoViaPublicID(publicID);
	}

	@Get("/forgot/:cpf")
	async esqueciMatricula(@Param("cpf") cpf: string): Promise<string> {
		return await this.alunoService.esqueciMatricula(cpf);
	}

	@UseGuards(JwtAuthGuard)
	@Get("perfil")
	getPerfil(@Request() req) {
		return this.alunoService.letAlunoViaMatricula(req.user.matricula);
	}
}
