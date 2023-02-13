/* eslint-disable prettier/prettier */
import { Product } from 'src/typeorm/entities/Products';
import { Repository } from 'typeorm';

/* eslint-disable prettier/prettier */
export interface Message {
    type: string,
    msg: string,
    repo: Repository<Product>
}