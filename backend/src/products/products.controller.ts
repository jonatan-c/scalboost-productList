import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    if (Object.keys(query).length) {
      return this.productsService.findByQuery(
        query,
        Number(page),
        Number(limit),
      );
    }
    return this.productsService.findAll(Number(page), Number(limit));
  }
}
