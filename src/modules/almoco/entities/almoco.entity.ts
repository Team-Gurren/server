import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "almoco" })
export class Almoco {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;

	@Column({ type: "json" })
	vendings: Array<{ id: number; quantity: number }>;
}
