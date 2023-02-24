import { Module } from '@nestjs/common';
import { OrderController } from '@Order/controllers/order.controller';
import { OrderService } from '@Order/services/order.service';

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
