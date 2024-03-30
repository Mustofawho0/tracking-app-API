// import { IUserJSON } from './type';
export interface IUser {
  name: string;
  nominal: number;
  category: string
  date : string
}

export interface IUserJSON extends IUser {
    id :  number
}
