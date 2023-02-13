import { CreateProductDto } from '../../dtos/CreateProduct.dto';
import { UpdateProductDto } from '../../dtos/UpdateProduct.dto';
import { Receiver } from 'src/azureSB/receiver';
export declare class ProductsController {
    private productService;
    constructor(productService: Receiver);
    getProducts(): Promise<void>;
    createProduct(createproductDto: CreateProductDto): void;
    updateProductById(id: number, updateproductDto: UpdateProductDto): Promise<void>;
    deleteProductById(id: number): Promise<void>;
}
