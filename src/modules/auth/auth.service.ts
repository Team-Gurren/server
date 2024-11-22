import { Injectable, UnauthorizedException } from "@nestjs/common";
// biome-ignore lint/style/useImportType: <explanation>
import { JwtService } from "@nestjs/jwt";
// biome-ignore lint/style/useImportType: <explanation>
import { AlunoService } from "../aluno/aluno.service";
import { invariant } from "src/common/utils/invariant.utils";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private alunoService: AlunoService,
	) {}

	async login(matricula: string, cpf: string): Promise<{ token: string }> {
		const user = this.alunoService.letAlunoViaMatricula(matricula);
		if((await user).cpf !== cpf) throw new UnauthorizedException();

		const payload = {
			matricula,
			sub: (await user).cpf,
		};

		const token = await this.jwtService.signAsync(payload);
		return { token };
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async userProfile(req: any) {
		console.log(req.user);
		const user = await this.alunoService.lerAlunoViaCPF(req.user.sub);
		return user;
	}
}
