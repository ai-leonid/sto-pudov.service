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

export interface userData {
  username?: string;
  firstName?: string;
  lastName?: string;
  activationCode?: string;
  email?: string;
  emailCode?: string;
  password?: string;
  passwordResetCode?: string;
  _id?: Types.ObjectId | string | null;
  hashdRt?: string | null;
}
