import { Injectable } from "@nestjs/common";
import type {
	TypeOrmModuleOptions,
	TypeOrmOptionsFactory,
} from "@nestjs/typeorm";
import { Almoco } from "src/modules/almoco/entities/almoco.entity";
import { Aluno } from "src/modules/aluno/entities/aluno.entity";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "sqlite",
			database: "database.sqlite",
			synchronize: true,
			logging: true,
			entities: [Aluno, Almoco],
		};
	}
}
