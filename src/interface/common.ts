import { Types } from 'mongoose';

export interface responseData {
  statusCode: number;
  timestamp: string;
  path?: string;
  data?: [] | null;
  message: string;
  isSuccess: boolean;
  error: string | null | [];
}

export interface IUserData {
  _id?: Types.ObjectId | string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  registrationDate?: Date;
  patronymic?: string;
  password?: string;
  shortNumber?: string;
  mainPhone?: string;
  extraPhones?: string[];
  promoCode?: string;
  friendsIds?: Types.ObjectId[];
  invitedById?: Types.ObjectId;
  bankDetails?: string[];
  balance?: number;
  hashRt?: string | null;
  // createdAt: Date;
  // updatedAt: Date;
}
