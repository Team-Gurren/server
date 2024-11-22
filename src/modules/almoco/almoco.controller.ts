import { Controller, Get, Post, Body, Param } from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import { AlmocoService } from "./almoco.service";
import type { CreateAlmocoDto } from "./dto/create-almoco.dto";
import type { Almoco } from "./entities/almoco.entity";

@Controller("almocos")
export class AlmocoController {
	constructor(private readonly almocoService: AlmocoService) {}

	@Get()
	async findAll(): Promise<Almoco[]> {
		return this.almocoService.findAll();
	}

	@Post("/criar")
	async create(@Body() createAlmocoDto: CreateAlmocoDto): Promise<Almoco> {
		return this.almocoService.createAlmoco(createAlmocoDto);
	}

	@Get("/id/:id")
	async getAlmocoPerId(@Param("id") id: number): Promise<Almoco> {
		return this.almocoService.getAlmocoPerId(id);
	}

	@Post("/aluno")
	async cadastrarAlunoAlmoco(@Body() body: { id: number }) {
		return this.almocoService.cadastrarAlunoAlmoco(body.id);
	}

	@Get("/hoje")
	async almocoDeHoje() {
		return this.almocoService.almocoDeHoje();
	}
}
