import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfigService } from "src/common/database/database.service";
import { AlmocoModule } from "src/modules/almoco/almoco.module";
import { AlunoModule } from "src/modules/aluno/aluno.module";
import { AuthModule } from "src/modules/auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			useClass: DatabaseConfigService,
			inject: [DatabaseConfigService],
		}),
		AlunoModule,
		AlmocoModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
