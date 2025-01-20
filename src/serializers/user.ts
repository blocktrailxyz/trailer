import { Serializer } from "jsonapi-serializer";

// type safe purpose
export interface IUserSerializer {
  id: number;
  displayName: string;
  emojicon: string;
}

export const UserSerializer = new Serializer(
  'users',
  {
    attributes: ['displayName', 'emojicon'],
    keyForAttribute: 'camelCase'
  }
)