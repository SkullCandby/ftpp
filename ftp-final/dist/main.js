"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const receiver_1 = require("./azureSB/receiver");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const serv = app.get(receiver_1.Receiver);
    console.log(await serv.receiveMessages(), 'main');
}
bootstrap();
//# sourceMappingURL=main.js.map