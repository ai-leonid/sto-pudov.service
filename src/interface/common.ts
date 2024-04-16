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
  first_name?: string;
  last_name?: string;
  activation_code?: string;
  email?: string;
  email_code?: string;
  password?: string;
  password_reset_code?: string;
  _id?: Types.ObjectId | string | null;
  hashdRt?: string | null;
}
