import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * Register DTO
 */
export class RegisterDto {
  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Must be a valid email' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
