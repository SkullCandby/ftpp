import * as asb from '@azure/service-bus';
import { CreateProductParams, UpdateProductParams } from './types';
export declare class AppService {
    connectionString: string;
    serviceBus: asb.ServiceBusClient;
    receiver: asb.ServiceBusReceiver;
    constructor();
    send_to_service(type: any, data: any, id: any, dto: any): Promise<void>;
    sendFind(): Promise<string>;
    sendUpdateProduct(id: number, updateproductDetails: UpdateProductParams): Promise<string>;
    sendCreateProduct(productDetails: CreateProductParams): Promise<string>;
    sendDelete(id: number): Promise<string>;
}
