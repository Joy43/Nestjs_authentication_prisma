import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
     private jwt: JwtService,
     private mailService: MailService,) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: { email: string; password: string }) {
    const validUser = await this.validateUser(user.email, user.password);
// --------payload to jwt ---
    const payload = { userId: validUser.id, role: validUser.role,email:validUser.email,name:validUser.name };
    const token = this.jwt.sign(payload);

    return { access_token: token, user: validUser };
  }

  // --------mail function----------------- --

  async requestReset(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

// --------------------6 digit code------------------
    const code = Math.floor(100000 + Math.random() * 900000).toString(); 
    // -------------------15 min validate time------------------
    const expiry = new Date(Date.now() + 15 * 60 * 1000); 

    await this.prisma.user.update({
      where: { email },
      data: {
        resetCode: code,
        resetCodeExpiry: expiry,
      },
    });

    await this.mailService.sendResetCode(email, code);

    return { message: 'Reset code sent to email' };
  }
// -------reset password------------------
 async verifyResetCode(email: string, code: string) {
  const user = await this.prisma.user.findUnique({ where: { email } });
  if (
    !user ||
    user.resetCode !== code ||
    !user.resetCodeExpiry ||
    user.resetCodeExpiry < new Date()
  ) {
    throw new BadRequestException('Invalid or expired reset code');
  }

  return { message: 'Code verified successfully' };
}

async setNewPassword(email: string, newPassword: string) {
  const user = await this.prisma.user.findUnique({ where: { email } });

  if (!user || !user.resetCode || !user.resetCodeExpiry || user.resetCodeExpiry < new Date()) {
    throw new BadRequestException('Code not verified or expired');
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await this.prisma.user.update({
    where: { email },
    data: {
      password: hashed,
      resetCode: null,
      resetCodeExpiry: null,
    },
  });

  return { message: 'Password set successfully' };
}

}
