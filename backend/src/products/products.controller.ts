import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll() {
    return await this.appService.getAll();
  }
  @Post()
  async create(@Body() product: CreateProductDto) {
    await this.appService.create(product);

    return 201;
  }
  @Put('/:id')
  async update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    await this.appService.update(id, product);
    return 200;
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.appService.delete(id);
    return 200;
  }
}
