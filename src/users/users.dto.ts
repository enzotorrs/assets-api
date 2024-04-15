import { PartialType } from '@nestjs/mapped-types';

export class BaseUserDto {
  name: string;
}

export class CreateUserDto extends BaseUserDto {}

export class UpdateUserDto extends PartialType(BaseUserDto) {}
