export type AddProductToBasketResponse =
  | {
      isSuccess: boolean;
      index: number;
    }
  | {
      isSuccess: false;
    };
