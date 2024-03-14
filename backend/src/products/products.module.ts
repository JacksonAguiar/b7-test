import { Module } from '@nestjs/common';
import { AppController } from './products.controller';
import { AppService } from './products.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class ProductsModule {}
