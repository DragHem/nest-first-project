import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from '../interfaces/shop';

@Injectable()
export class ShopService {
  getProducts(): GetListOfProductsResponse {
    return [
      {
        name: 'iPhone',
        price: 4200,
        description: 'iPhone description',
      },
      {
        name: 'Samsung FE2020',
        price: 3600,
        description: 'Samsung FE2020 description',
      },
      {
        name: 'MacBook Air',
        price: 4200,
        description: 'MBA description',
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }
}
