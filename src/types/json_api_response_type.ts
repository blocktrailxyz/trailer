export interface JsonApiResponseType<T> {
  data: {
    type: string;
    id: string;
    attributes: T;
  } | {
    type: string;
    id: string;
    attributes: T;
  }[];
}
