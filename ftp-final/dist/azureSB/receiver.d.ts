import * as asb from "@azure/service-bus";
import { ProductsService } from "src/products/services/products/product.service";
import { Repository } from "typeorm";
import { Product } from "src/typeorm/entities/Products";
export declare class Receiver {
    private dbWriterCSPService;
    connectionString: string;
    serviceBus: asb.ServiceBusClient;
    receiver: asb.ServiceBusReceiver;
    repo: Repository<Product>;
    constructor(dbWriterCSPService: ProductsService);
    receiveMessages(): Promise<void>;
}
