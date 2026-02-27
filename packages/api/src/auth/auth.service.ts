import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthAccesTokenPayload } from './auth.type';

export type AuthSignInResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  private readonly hashRounds: number;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.hashRounds = +this.configService.getOrThrow<string>('HASH_ROUNDS');
  }

  async signUp(email: string, password: string): Promise<UserEntity> {
    const hashedPassword = await hash(password, this.hashRounds);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async signIn(username: string, pass: string): Promise<AuthSignInResponse> {
    const user = await this.userRepository.findOne({
      where: { email: username },
    });

    if (!user || !(await compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload: AuthAccesTokenPayload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
