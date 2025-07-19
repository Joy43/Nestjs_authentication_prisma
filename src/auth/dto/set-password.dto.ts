import { IsEmail, IsString, Length } from 'class-validator';

export class SetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 64)
  newPassword: string;
}
