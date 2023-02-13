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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const asb = require("@azure/service-bus");
let AppService = class AppService {
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
        }
        finally {
            await sender.close();
        }
    }
    async sendFind() {
        await this.send_to_service('find', '', 0, '').catch((err) => {
            console.log(err);
        });
        return 'find!';
    }
    async sendUpdateProduct(id, updateproductDetails) {
        await this.send_to_service('update', '', id, updateproductDetails).catch((err) => {
            console.log(err);
        });
        return 'update';
    }
    async sendCreateProduct(productDetails) {
        this.send_to_service('create', '', 0, productDetails).catch((err) => {
            console.log(err);
        });
        return 'create';
    }
    async sendDelete(id) {
        await this.send_to_service('delete', '', id, '').catch((err) => {
            console.log(err);
        });
        return 'delete';
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map