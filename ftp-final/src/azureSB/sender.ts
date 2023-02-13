/* eslint-disable prettier/prettier */
import * as asb from "@azure/service-bus"
import { ProductsService } from "src/products/services/products/product.service";
import { Product } from "src/typeorm/entities/Products";
import { promisify } from "util";
import { Message } from "./message";

const connectionString = "Endpoint=sb://servicebus-testn.servicebus.windows.net/;SharedAccessKeyName=link;SharedAccessKey=cU9er/PjmJ2HwrHQsJySNNiT0zFCIDKsxN6W+7LbARY=;EntityPath=glebstudy";

const serviceBus = new asb.ServiceBusClient(connectionString);

export async function send(type, message, repo) {
    const sender = serviceBus.createSender("glebstudy");
    try {
    await sender.sendMessages({
        body: JSON.stringify({type: type, msg: message, repo: repo}),
        applicationProperties: { "my-property": "my-value" },
    });
    console.log("Message sent ", message);
    } finally {
    await sender.close();
    }
}

export async function send_to_service(type, data, id, dto) {
    const sender = serviceBus.createSender("glebstudy");
    try {
    await sender.sendMessages({
        body: JSON.stringify({type: type, data: data, id: id, dto: dto} ),
        applicationProperties: { "my-property": "my-value" },
    });
    console.log("Message sent tp");
    } finally {
    await sender.close();
    }
}

export async function send_to_contoller(prom) {
    const sender = serviceBus.createSender("glebstudy");
    try {
    await sender.sendMessages({
        body: prom,
        applicationProperties: { "my-property": "my-value" },
    });
    console.log("Message sent to contr");
    } finally {
    await sender.close();
    }
}

