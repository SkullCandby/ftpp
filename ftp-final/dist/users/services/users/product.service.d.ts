import { Repository } from 'typeorm';
import { Product } from '../../../typeorm/entities/Products';
import { CreateProductParams, UpdateProductParams } from '../../types';
export declare class ProductsService {
    private userRepository;
    constructor(userRepository: Repository<Product>);
    findProducts(): Promise<Product[]>;
    createProduct(userDetails: CreateProductParams): Promise<Product>;
    updateProduct(id: number, updateUserDetails: UpdateProductParams): Promise<import("typeorm").UpdateResult>;
    deleteProduct(id: number): Promise<import("typeorm").DeleteResult>;
}
