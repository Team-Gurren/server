import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlunoService } from "./aluno.service";
import { AlunoController } from "./aluno.controller";
import { Aluno } from "./entities/aluno.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Aluno])],
	controllers: [AlunoController],
	providers: [AlunoService],
	exports: [AlunoService],
})
export class AlunoModule { }
