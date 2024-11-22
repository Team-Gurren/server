import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity({ name: "aluno" })
export class Aluno {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", unique: true, generated: "uuid" })
	publicID: string;

	@Column({ type: "varchar" })
	nome: string;

	@Column({ type: "varchar", unique: true })
	matricula: string;

	@Column({ type: "varchar" })
	turma: string;

	@Column({ type: "varchar", unique: true, length: 11 })
	cpf: string;

	@Column({ type: "date" })
	dataNascimento: Date;

	@Column({ type: "varchar", nullable: true })
	telefone: string;

	@Column({ type: "varchar", nullable: true })
	endereco: string;

	@CreateDateColumn()
	criadoEm: Date;

	@UpdateDateColumn()
	atualizadoEm: Date;
}
