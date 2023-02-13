import { Injectable } from '@nestjs/common';
import * as asb from '@azure/service-bus';
import { CreateProductParams, UpdateProductParams } from './types';

@Injectable()
export class AppService {
  connectionString: string;
  serviceBus: asb.ServiceBusClient;
  receiver: asb.ServiceBusReceiver;
  constructor() {
    this.connectionString =
      'Endpoint=sb://servicebus-testn.servicebus.windows.net/;SharedAccessKeyName=link;SharedAccessKey=WD/lGrCxzoG7jEPKN7cBRsCzLsXzRTUE09qA+Ibgvw8=;EntityPath=glebstudy';
    this.serviceBus = new asb.ServiceBusClient(this.connectionString);
    this.receiver = this.serviceBus.createReceiver('glebstudy');
  }
  async send_to_service(type, data, id, dto) {
    const sender = this.serviceBus.createSender('glebstudy');
    try {
      await sender.sendMessages({
        body: JSON.stringify({ type: type, data: data, id: id, dto: dto }),
        applicationProperties: { 'my-property': 'my-value' },
      });
      console.log('Message sent try');
    } finally {
      await sender.close();
    }
  }
  async sendFind(): Promise<string> {
    await this.send_to_service('find', '', 0, '').catch((err) => {
      console.log(err);
    });
    return 'find!';
  }
  async sendUpdateProduct(
    id: number,
    updateproductDetails: UpdateProductParams,
  ): Promise<string> {
    await this.send_to_service('update', '', id, updateproductDetails).catch(
      (err) => {
        console.log(err);
      },
    );
    return 'update';
  }
  async sendCreateProduct(productDetails: CreateProductParams) {
    this.send_to_service('create', '', 0, productDetails).catch((err) => {
      console.log(err);
    });
    return 'create';
  }
  async sendDelete(id: number) {
    await this.send_to_service('delete', '', id, '').catch((err) => {
      console.log(err);
    });
    return 'delete';
  }
}
