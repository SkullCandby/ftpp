/* eslint-disable prettier/prettier */
import * as asb from "@azure/service-bus"
import { ProductsService } from "src/products/services/products/product.service";
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "src/typeorm/entities/Products";

interface ParseJSON {
    type: string;
    data: any;
    id: number;
    dto: any;
}

@Injectable()
export class Receiver {
    connectionString: string;
    serviceBus: asb.ServiceBusClient;
    receiver: asb.ServiceBusReceiver;
    repo: Repository<Product>;
    constructor(private dbWriterCSPService: ProductsService) {
        this.connectionString = "Endpoint=sb://servicebus-testn.servicebus.windows.net/;SharedAccessKeyName=link;SharedAccessKey=WD/lGrCxzoG7jEPKN7cBRsCzLsXzRTUE09qA+Ibgvw8=;EntityPath=glebstudy";
        this.serviceBus = new asb.ServiceBusClient(this.connectionString);
        this.receiver = this.serviceBus.createReceiver("glebstudy");
    }

      async receiveMessages() {
        while (true) {
          const messages = await this.receiver.receiveMessages(1, {
            maxWaitTimeInMs: 5000,
          });
          for (const message of messages) {
            console.log(`Received message: ${message.body}`);
            const rec_msg: ParseJSON = JSON.parse(message.body);
          try {
            if (rec_msg.type == "find") {
                this.dbWriterCSPService.findProducts().then(result => {
                    console.log(result);
                  });
              await this.receiver.completeMessage(message);
            } else if (rec_msg.type == "update") {
              const ret = await this.dbWriterCSPService.updateProduct(rec_msg.id, rec_msg.dto);
              await this.receiver.completeMessage(message);
            } else if (rec_msg.type == "create") {
              const ret = this.dbWriterCSPService.createProduct(rec_msg.dto);
              await this.receiver.completeMessage(message);
            } else if (rec_msg.type == "delete") {
              const ret = this.dbWriterCSPService.deleteProduct(rec_msg.id);
              await this.receiver.completeMessage(message);
            } else {
              console.log("ERRRRRRR");
              await this.receiver.deadLetterMessage(message);
            }
          } catch {
            console.log("ERRRRRRR");
            await this.receiver.deadLetterMessage(message);
          }
          }
        }
      }
}
