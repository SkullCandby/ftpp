import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';

@Controller()
export class AppController {
  constructor(private produceService: AppService) {}
  @Get()
  async getProducts() {
    const ret = await this.produceService.sendFind();
    console.log(ret);
    return ret;
  }

  @Post()
  createProduct(@Body() createproductDto: CreateProductDto) {
    return this.produceService.sendCreateProduct(createproductDto);
  }

  @Put(':id')
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateproductDto: UpdateProductDto,
  ) {
    return this.produceService.sendUpdateProduct(id, updateproductDto);
  }

  @Delete(':id')
  async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    return this.produceService.sendDelete(id);
  }
}
