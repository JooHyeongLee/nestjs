import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class OrderService {
    constructor(
      private readonly config: ConfigService
    ) {
        console.log(config.get("database.host"))
    }
}