import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { CommonService } from './common/common.service';


@Module({
  imports: [ DatabaseModule, ProductsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, CommonService],
})
export class AppModule {}
