/* eslint-disable prettier/prettier */
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
import { send, send_to_service } from 'src/azureSB/sender';
import { CreateProductDto } from '../../dtos/CreateProduct.dto';
import { UpdateProductDto } from '../../dtos/UpdateProduct.dto';
import { ProductsService } from '../../services/products/product.service';
import { Receiver } from 'src/azureSB/receiver';

@Controller('products')
export class ProductsController {
  constructor(private productService: Receiver) {}
  @Get()
  async getProducts() {
    /* send_to_service("find", "", 0, "").catch(err => {
      console.log(err);
    }) */
    //const ret = await this.productService.receive();
    //console.log(ret);
    //return ret;
  }

  @Post()
  createProduct(@Body() createproductDto: CreateProductDto) {
    /* send_to_service("create", "", 0, createproductDto).catch(err => {
      console.log(err);
    }) */
    //return this.productService.receive();
  }

  @Put(':id')
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateproductDto: UpdateProductDto,
  ) {
    /* send_to_service("update", "", id, updateproductDto).catch(err => {
      console.log(err);
    }) */
    //return this.productService.receive();
  }

  @Delete(':id')
  async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    /* send_to_service("delete", "", id, "").catch(err => {
      console.log(err);
    }) */
    //return this.productService.receive();
  }
}
