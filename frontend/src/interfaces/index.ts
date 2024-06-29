export interface IResponseBackend {
  data: Data[];
  total: number;
  page: number;
  limit: number;
}

export interface Data {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
