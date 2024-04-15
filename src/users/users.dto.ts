import { PartialType } from '@nestjs/mapped-types';

export class BaseUserDto {
  username: string;
  password: string;
}

export class CreateUserDto extends BaseUserDto {}

export class UpdateUserDto extends PartialType(BaseUserDto) {}
