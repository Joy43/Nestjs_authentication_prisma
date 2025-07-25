import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import configuration from './config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  
    DatabaseModule, ProductsModule, UsersModule, AuthModule, PrismaModule, MailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, MailService],
})
export class AppModule {}
