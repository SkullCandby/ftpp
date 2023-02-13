import { Product } from 'src/typeorm/entities/Products';
import { Repository } from 'typeorm';
export interface Message {
    type: string;
    msg: string;
    repo: Repository<Product>;
}
