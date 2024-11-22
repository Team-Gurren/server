import { Module } from "@nestjs/common";
import { AlmocoService } from "./almoco.service";
import { AlmocoController } from "./almoco.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Almoco } from "./entities/almoco.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Almoco])],
	controllers: [AlmocoController],
	providers: [AlmocoService],
})
export class AlmocoModule {}
