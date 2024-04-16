import { Injectable } from '@nestjs/common';
import { LoggerService } from '../common/service/logger.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserSchemaAlias } from 'src/common/schemas/user.schema';
import { RefreshToken, RefreshTokenSchemaAlias } from 'src/common/schemas/refresh-token.schema';
import * as bcrypt from 'bcrypt';
import { userData } from 'src/interface/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaAlias) private readonly userModel: Model<User>,
    @InjectModel(RefreshTokenSchemaAlias)
    private readonly RefreshTokenModel: Model<RefreshToken>,
    private readonly logger: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const id: string = uuid();
    this.logger.log('User service create called', id, 'users.service.ts', '', '', 'create-service');
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hashedPassword;
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<userData[]> {
    const id: string = uuid();
    this.logger.log(
      'User service findAll called',
      id,
      'users.service.ts',
      '',
      '',
      'findAll-service',
    );
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<userData> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneUser(email: string): Promise<userData> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel.findByIdAndRemove({ _id: id }).exec();
    return deletedUser;
  }

  async updateOne(userId: Types.ObjectId | string, data: userData) {
    await this.userModel.updateOne({ _id: userId }, data);
  }

  async createRefreshToken(createUserDto: CreateUserDto): Promise<boolean> {
    const createdUser = await this.RefreshTokenModel.create(createUserDto);
    return true;
  }
}
