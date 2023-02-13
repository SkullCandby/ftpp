import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../typeorm/entities/Products';
import { CreateProductParams, UpdateProductParams } from '../../types';
import { send, send_to_contoller } from '../../../azureSB/sender';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findProducts() {
    const products = await this.productRepository.find();
    return products;
  }

  async createProduct(productDetails: CreateProductParams) {
    const newproduct = this.productRepository.create(productDetails);
    const result = await this.productRepository
      .save(newproduct)
      .catch((err) => {
        console.log(err);
      });
    return result;
  }

  async updateProduct(id: number, updateproductDetails: UpdateProductParams) {
    const result = await this.productRepository
      .update({ id }, { ...updateproductDetails })
      .catch((err) => {
        console.log(err);
      });
    return result;
  }

  async deleteProduct(id: number) {
    const result = await this.productRepository.delete({ id });
    return result;
  }
}
