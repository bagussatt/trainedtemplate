import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ReqUser } from 'src/interface/request';
import { Public } from './auth.metadata';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { RegisterDto } from './dto/register';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   *  User registration
   */
  @Public()
  @Post('register')
  @ApiOkResponse({
    description: 'User registered successfully',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            userId: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
        access_token: { type: 'string' },
      },
    },
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  /**
   *  User login
   *
   * @param signInDto - The login credentials
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'Access Token Response',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  /**
   *  Refresh access token
   */
  @Post('refresh')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Access Token Response',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  async refreshToken(@Request() req: ReqUser) {
    return this.authService.refresh(Number(req.user?.sub));
  }

  /**
   *  Get user profile
   */
  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User Profile',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number' },
        email: { type: 'string' },
      },
    },
  })
  async getProfile(@Request() req: ReqUser) {
    return req.user;
  }
}
