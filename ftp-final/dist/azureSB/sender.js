"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_to_contoller = exports.send_to_service = exports.send = void 0;
const asb = require("@azure/service-bus");
const connectionString = "Endpoint=sb://servicebus-testn.servicebus.windows.net/;SharedAccessKeyName=link;SharedAccessKey=cU9er/PjmJ2HwrHQsJySNNiT0zFCIDKsxN6W+7LbARY=;EntityPath=glebstudy";
const serviceBus = new asb.ServiceBusClient(connectionString);
async function send(type, message, repo) {
    const sender = serviceBus.createSender("glebstudy");
    try {
        await sender.sendMessages({
            body: JSON.stringify({ type: type, msg: message, repo: repo }),
            applicationProperties: { "my-property": "my-value" },
        });
        console.log("Message sent ", message);
    }
    finally {
        await sender.close();
    }
}
exports.send = send;
async function send_to_service(type, data, id, dto) {
    const sender = serviceBus.createSender("glebstudy");
    try {
        await sender.sendMessages({
            body: JSON.stringify({ type: type, data: data, id: id, dto: dto }),
            applicationProperties: { "my-property": "my-value" },
        });
        console.log("Message sent tp");
    }
    finally {
        await sender.close();
    }
}
exports.send_to_service = send_to_service;
async function send_to_contoller(prom) {
    const sender = serviceBus.createSender("glebstudy");
    try {
        await sender.sendMessages({
            body: prom,
            applicationProperties: { "my-property": "my-value" },
        });
        console.log("Message sent to contr");
    }
    finally {
        await sender.close();
    }
}
exports.send_to_contoller = send_to_contoller;
//# sourceMappingURL=sender.js.map