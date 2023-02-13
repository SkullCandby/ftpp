import { CreateProductDto } from '../../dtos/CreateProduct.dto';
import { UpdateProductDto } from '../../dtos/UpdateProduct.dto';
import { ProductsService } from '../../services/products/product.service';
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    getProducts(): Promise<import("../../../typeorm/entities/Products").Product[]>;
    createProduct(createUserDto: CreateProductDto): Promise<import("../../../typeorm/entities/Products").Product>;
    updateProductById(id: number, updateUserDto: UpdateProductDto): Promise<void>;
    deleteProductById(id: number): Promise<void>;
}
