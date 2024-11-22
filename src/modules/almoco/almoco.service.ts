import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, type Repository } from "typeorm";
import { Almoco } from "./entities/almoco.entity";
import type { CreateAlmocoDto } from "./dto/create-almoco.dto";
import { invariant } from "src/common/utils/invariant.utils";

@Injectable()
export class AlmocoService {
	constructor(
		@InjectRepository(Almoco)
		private readonly almocoRepository: Repository<Almoco>,
	) {}

	async createAlmoco(almoco: CreateAlmocoDto): Promise<Almoco> {
		invariant(almoco, "Necessita de dados");
		const almocosDeHoje = await this.getAlmocosHoje();
		invariant(
			almocosDeHoje.length === 0,
			"Já existe um almoço criado para hoje",
		);

		const newAlmoco = this.almocoRepository.create(almoco);
		return this.almocoRepository.save(newAlmoco);
	}

	async findAll(): Promise<Almoco[]> {
		return this.almocoRepository.find();
	}

	async getAlmocoPerId(id: number): Promise<Almoco> {
		invariant(id, "Necessita de um id");
		const almoco = await this.almocoRepository.findOneBy({ id });
		invariant(almoco, "Almoco não encontrado");
		return almoco;
	}

	async deleteAlmoco(id: number): Promise<void> {
		invariant(id, "Necessita de um id");
		const result = await this.almocoRepository.delete(id);
		invariant(result.affected > 0, "Almoco não encontrado");
	}

	async cadastrarAlunoAlmoco(id: number) {
		const almocosDeHoje = await this.getAlmocosHoje();
		invariant(
			almocosDeHoje.length > 0,
			"Nenhum almoco encontrado para atualizar",
		);

		const newVending = { id, quantity: 1 };
		const almoco = almocosDeHoje[0];

		invariant(almoco, "Almoco não encontrado");
		if (!almoco.vendings) {
			almoco.vendings = [];
		}

		const existingVending = almoco.vendings.find(
			(vending) => vending.id === newVending.id,
		);
		if (existingVending) {
			existingVending.quantity += newVending.quantity;
		} else {
			almoco.vendings.push(newVending);
		}

		await this.almocoRepository.save(almoco);
		return "Almocos atualizados com sucesso.";
	}

	async almocoDeHoje() {
		const almocosDeHoje = await this.getAlmocosHoje();
		invariant(
			almocosDeHoje.length > 0,
			"Nenhum almoco encontrado para atualizar",
		);
		return almocosDeHoje[0];
	}

	private async getAlmocosHoje(): Promise<Almoco[]> {
		const hoje = new Date();
		const startOfDay = new Date(hoje.setHours(0, 0, 0, 0));
		const endOfDay = new Date(hoje.setHours(23, 59, 59, 999));

		return this.almocoRepository.find({
			where: {
				createdAt: Between(startOfDay, endOfDay),
			},
		});
	}
}

// // async test(id: number) {
// // 	const idsAlmocos = await this.testcheckAlmocosHoje();
// // 	invariant(idsAlmocos.length > 0, "Nenhum almoco encontrado para atualizar");

// // 	const newVending = {
// // 		id: id,
// // 		quantity: 1,
// // 	};

// // 	const almoco = await this.almocoRepository.findOneBy({ id: idsAlmocos[0] });

// // 	invariant(almoco, "Almoco não encontrado");
// // 	if (!almoco.vendings) {
// // 		almoco.vendings = [];
// // 	}

// // 	const existingVending = almoco.vendings.find(
// // 		(vending) => vending.id === newVending.id,
// // 	);

// // 	if (existingVending) {
// // 		existingVending.quantity += newVending.quantity;
// // 	} else {
// // 		almoco.vendings.push(newVending);
// // 	}

// // 	await this.almocoRepository.save(almoco);

// // 	return "Almocos atualizados com sucesso.";
// // }

// private async testcheckAlmocosHoje() {
// 	const hoje = new Date();
// 	const dataAtual = hoje.toISOString().split("T")[0];

// 	const almocos = await this.almocoRepository.find();

// 	const almocosDeHoje = almocos.filter((almoco) => {
// 		const dataDoBanco = almoco.createdAt.toISOString().split("T")[0];
// 		return dataDoBanco === dataAtual;
// 	});

// 	invariant(almocosDeHoje.length > 0, "Nenhum almoco encontrado para hoje");

// 	const ids = almocosDeHoje.map((almoco) => almoco.id);

// 	return ids;
// }
