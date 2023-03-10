import { Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  add(item: AddProductDto): AddProductToBasketResponse {
    const { name, count } = item;
    const { items } = this;

    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      !name ||
      count < 1 ||
      !this.shopService.hasProduct(name)
    )
      return {
        isSuccess: false,
      };

    items.push(item);

    return {
      isSuccess: true,
      index: items.length - 1,
    };
  }

  remove(index: number): RemoveProductFromBasketResponse {
    const { items } = this;

    if (index < 0 || index >= items.length) {
      return { isSuccess: false };
    }

    items.splice(index, 1);

    return { isSuccess: true };
  }

  list(): ListProductsInBasketResponse {
    return this.items;
  }

  getTotalPrice(): GetTotalPriceResponse {
    if (!this.items.every((item) => this.shopService.hasProduct(item.name))) {
      return { isSuccess: false };
    }

    return this.items
      .map(
        (item) =>
          this.shopService.getPriceOfProduct(item.name) * item.count * 1.23,
      )
      .reduce((prev, curr) => prev + curr, 0);
  }
}
