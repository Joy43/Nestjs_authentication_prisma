import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto } from './dto/request-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SetPasswordDto } from './dto/set-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  // --------mail---
   @Post('request-reset')
  requestReset(@Body() dto: RequestResetDto) {
    return this.authService.requestReset(dto.email);
  }

 @Post('verify-reset-code')
  verifyResetCode(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyResetCode(dto.email, dto.code);
  }

  @Post('set-new-password')
  setNewPassword(@Body() dto: SetPasswordDto) {
    return this.authService.setNewPassword(dto.email, dto.newPassword);
  }
}

