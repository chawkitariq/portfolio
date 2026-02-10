import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  @IsDefined()
  email!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password!: string;
}
