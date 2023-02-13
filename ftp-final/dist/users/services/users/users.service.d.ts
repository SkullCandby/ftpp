import { Repository } from 'typeorm';
import { Product } from '../../../typeorm/entities/Products';
import { CreateUserParams, UpdateUserParams } from '../../types';
export declare class ProductsService {
    private userRepository;
    constructor(userRepository: Repository<Product>);
    findProducts(): Promise<Product[]>;
    createProduct(userDetails: CreateUserParams): Promise<Product>;
    updateProduct(id: number, updateUserDetails: UpdateUserParams): Promise<import("typeorm").UpdateResult>;
    deleteProduct(id: number): Promise<import("typeorm").DeleteResult>;
}
