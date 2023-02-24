import { DatabaseModule } from '@Common/db.module';
import { Module } from '@nestjs/common';
import { OrderModule } from '@Order/order.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([]),
        OrderModule,
    ]
})
export class AppModule {}
