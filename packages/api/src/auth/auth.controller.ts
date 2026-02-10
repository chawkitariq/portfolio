import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/sign-in.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Public()
  async signIn(@Body() dto: AuthSignInDto) {
    return this.authService.signIn(dto.email, dto.password);
  }
}
