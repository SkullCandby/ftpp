import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receiver } from 'src/azureSB/receiver';
import { Product } from '../typeorm/entities/Products';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [Receiver, ProductsService],
})
export class ProductsModule {}
