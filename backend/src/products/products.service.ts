import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.product.findMany();
  }
  async create(data: any) {
    return await this.prisma.product.create({ data });
  }
  async delete(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }
  async update(id: string, data: any) {
    return await this.prisma.product.update({ where: { id }, data: data });
  }
}
