import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import  { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() data: { matricula: string; cpf: string }) {
        try {
            const { token } = await this.authService.login(data.matricula, data.cpf);
            return  token
        } catch (error) {
            return HttpStatus.UNAUTHORIZED
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        if(!req.user) return null
        console.log(req.user)
        return this.authService.userProfile(req);
    }
}