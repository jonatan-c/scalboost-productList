export interface IResponseBackend {
  data: IProduct[];
  total: number;
  page: number;
  limit: number;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
