import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// jwtFromRequest: (req: Request) => {
			//     const token = req.cookies['token'];
			//     return token || null
			// },
			ignoreExpiration: false,
			secretOrKey: "ceti",
		});
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async validate(payload: any) {
		console.log("JWT Payload:", payload); 
		return { sub: payload.sub, username: payload.username }; 
	}
}
