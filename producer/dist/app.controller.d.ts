import { AppService } from './app.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
export declare class AppController {
    private produceService;
    constructor(produceService: AppService);
    getProducts(): Promise<string>;
    createProduct(createproductDto: CreateProductDto): Promise<string>;
    updateProductById(id: number, updateproductDto: UpdateProductDto): Promise<string>;
    deleteProductById(id: number): Promise<string>;
}
