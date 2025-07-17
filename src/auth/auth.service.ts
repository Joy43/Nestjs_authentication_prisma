import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

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
}
