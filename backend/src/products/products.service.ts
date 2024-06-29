import { Injectable } from '@nestjs/common';
import { fakeData } from 'src/data';

@Injectable()
export class ProductsService {
  private getProductsData() {
    const data = fakeData;

    return JSON.parse(JSON.stringify(data));
  }

  findAll(page: number, limit: number) {
    const products = this.getProductsData();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    return {
      data: paginatedProducts,
      total: products.length,
      page,
      limit,
    };
  }

  findByQuery(query: any, page: number, limit: number) {
    let products = this.getProductsData();

    if (query.name) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(query.name.toLowerCase()),
      );
    }

    if (query.minPrice) {
      products = products.filter(
        (product) => product.price >= Number(query.minPrice),
      );
    }

    if (query.maxPrice) {
      products = products.filter(
        (product) => product.price <= Number(query.maxPrice),
      );
    }

    if (query.minQuantity) {
      products = products.filter(
        (product) => product.quantity >= Number(query.minQuantity),
      );
    }

    if (query.maxQuantity) {
      products = products.filter(
        (product) => product.quantity <= Number(query.maxQuantity),
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      total: products.length,
      page,
      limit,
    };
  }
}
