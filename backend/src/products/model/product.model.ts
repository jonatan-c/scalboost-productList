import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: '123', description: 'ID del producto' })
  id: string;

  @ApiProperty({ example: 'Producto A', description: 'Nombre del producto' })
  name: string;

  @ApiProperty({ example: 100, description: 'Precio del producto' })
  price: number;

  @ApiProperty({ example: 10, description: 'Cantidad del producto' })
  quantity: number;
}
