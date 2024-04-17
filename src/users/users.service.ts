import { Injectable } from '@nestjs/common';
import { LoggerService } from '../common/service/logger.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserSchemaAlias } from 'src/common/schemas/user.schema';
import { RefreshToken, RefreshTokenSchemaAlias } from 'src/common/schemas/refresh-token.schema';
import bcrypt from 'bcrypt';
import { IUserData } from 'src/interface/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaAlias)
    private readonly _userModel: Model<User>,
    @InjectModel(RefreshTokenSchemaAlias)
    private readonly _refreshTokenModel: Model<RefreshToken>,
    private readonly _logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUserData> {
    const id: string = uuid();
    this._logger.log(
      'User service create called',
      id,
      'users.service.ts',
      '',
      '',
      'create-service',
    );
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hashedPassword;
    const createdUser = await this._userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<IUserData[]> {
    const id: string = uuid();
    this._logger.log(
      'User service findAll called',
      id,
      'users.service.ts',
      '',
      '',
      'findAll-service',
    );
    return await this._userModel.find();
  }

  async findOneById(id: string): Promise<IUserData> {
    return this._userModel.findOne({ _id: id }).exec();
  }

  async findOneByEmail(email: string): Promise<IUserData> {
    return await this._userModel.findOne({ email: email });
  }

  async deleteById(id: string) {
    const deletedUser = await this._userModel.findByIdAndRemove({ _id: id }).exec();
    return deletedUser;
  }

  async updateOne(userId: Types.ObjectId | string, data: IUserData) {
    await this._userModel.updateOne({ _id: userId }, data);
  }

  async createRefreshToken(createUserDto: CreateUserDto): Promise<boolean> {
    const createdUser = await this._refreshTokenModel.create(createUserDto);
    return true;
  }
}
