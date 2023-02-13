"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receiver = void 0;
const asb = require("@azure/service-bus");
const product_service_1 = require("../products/services/products/product.service");
const common_1 = require("@nestjs/common");
let Receiver = class Receiver {
    constructor(dbWriterCSPService) {
        this.dbWriterCSPService = dbWriterCSPService;
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
                const rec_msg = JSON.parse(message.body);
                try {
                    if (rec_msg.type == "find") {
                        this.dbWriterCSPService.findProducts().then(result => {
                            console.log(result);
                        });
                        await this.receiver.completeMessage(message);
                    }
                    else if (rec_msg.type == "update") {
                        const ret = await this.dbWriterCSPService.updateProduct(rec_msg.id, rec_msg.dto);
                        await this.receiver.completeMessage(message);
                    }
                    else if (rec_msg.type == "create") {
                        const ret = this.dbWriterCSPService.createProduct(rec_msg.dto);
                        await this.receiver.completeMessage(message);
                    }
                    else if (rec_msg.type == "delete") {
                        const ret = this.dbWriterCSPService.deleteProduct(rec_msg.id);
                        await this.receiver.completeMessage(message);
                    }
                    else {
                        console.log("ERRRRRRR");
                        await this.receiver.deadLetterMessage(message);
                    }
                }
                catch (_a) {
                    console.log("ERRRRRRR");
                    await this.receiver.deadLetterMessage(message);
                }
            }
        }
    }
};
Receiver = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductsService])
], Receiver);
exports.Receiver = Receiver;
//# sourceMappingURL=receiver.js.map