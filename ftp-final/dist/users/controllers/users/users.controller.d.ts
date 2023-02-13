import { CreateProductDto } from '../../dtos/CreateUser.dto';
import { UpdateProductDto } from '../../dtos/UpdateUser.dto';
import { ProductsService } from '../../services/users/users.service';
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    getProducts(): Promise<import("../../../typeorm/entities/Products").Product[]>;
    createProduct(createUserDto: CreateProductDto): Promise<import("../../../typeorm/entities/Products").Product>;
    updateProductById(id: number, updateUserDto: UpdateProductDto): Promise<void>;
    deleteProductById(id: number): Promise<void>;
}
