import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class UsersMapper {
  static mapToUserResponse(user): any {
    return {
      id: user._id,
      firstName: user.firstName,
    };
  }
}
