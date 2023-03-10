export type AddProductToBasketResponse =
  | {
      isSuccess: boolean;
      index: number;
    }
  | {
      isSuccess: false;
    };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}
