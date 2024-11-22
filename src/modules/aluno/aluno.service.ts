import { Injectable } from "@nestjs/common";
import { Aluno } from "./entities/aluno.entity";
import type { CreateAlunoDto } from "./dto/create-aluno.dto";
import type { UpdateAlunoDto } from "./dto/update-aluno.dto";
import { invariant } from "src/common/utils/invariant.utils";
import type { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AlunoService {
	constructor(@InjectRepository(Aluno) private readonly alunoRepository: Repository<Aluno>) { }

	async cadastrarAluno(aluno: CreateAlunoDto): Promise<Aluno> {
		const data = this.alunoRepository.create(aluno);
		return await this.alunoRepository.save(data);
	}

	async autualizarAluno(id: number, aluno: UpdateAlunoDto): Promise<Aluno> {
		invariant(id, "Necessário o id para atualizar o Aluno");
		const data = await this.alunoRepository.preload({ id, ...aluno });
		invariant(data, "Aluno não encontrado");
		return await this.alunoRepository.save(data);
	}

	async deletarAluno(publicID: string): Promise<void> {
		invariant(publicID, "Necessário o publicID");
		const result = await this.alunoRepository.delete(publicID);
		invariant(result.affected > 0, "Aluno não encontrado");
	}

	async lerAlunoViaCPF(cpf: string): Promise<Aluno> {
		invariant(cpf, "CPF é necessário para buscar o Aluno");
		const data = await this.alunoRepository.findOneBy({ cpf });
		invariant(data, "Aluno não encontrado");
		return data;
	}

	async letAlunoViaMatricula(matricula: string): Promise<Aluno> {
		invariant(matricula, "Necessário matricula para buscar o aluno");
		const data = await this.alunoRepository.findOneBy({ matricula });
		invariant(data, "Aluno não encontrado");
		return data;
	}

	async lerAlunoViaPublicID(publicID: string): Promise<Aluno> {
		invariant(publicID, "Necessário o publicID para buscar o Aluno");
		const data = await this.alunoRepository.findOneBy({ publicID });
		invariant(data, "Aluno não encontrado");
		return data;
	}

	async lerTodoOsAlunos(): Promise<Aluno[]> {
		return await this.alunoRepository.find()
	}
}
