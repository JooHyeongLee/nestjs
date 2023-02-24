import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('order')
export class OrderController {
    constructor() { }

    @Get(':id')
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }
}
