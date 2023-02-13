import { Repository } from 'typeorm';
import { Product } from '../../../typeorm/entities/Products';
import { CreateProductParams, UpdateProductParams } from '../../types';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findProducts(): Promise<Product[]>;
    createProduct(productDetails: CreateProductParams): Promise<void | Product>;
    updateProduct(id: number, updateproductDetails: UpdateProductParams): Promise<void | import("typeorm").UpdateResult>;
    deleteProduct(id: number): Promise<import("typeorm").DeleteResult>;
}
