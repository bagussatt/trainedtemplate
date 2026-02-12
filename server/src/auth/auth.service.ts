import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { HashService } from 'src/common/hash.service';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await this.hash.hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = user;
    return {
      user: result,
      access_token: await this.jwtService.signAsync(await this.createPayload(user)),
    };
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException();

    const isValid = await this.hash.comparePasswords(password, user.password);
    if (!isValid) throw new UnauthorizedException();

    const { password: _, ...result } = user;
    return {
      // ...result,
      access_token: await this.jwtService.signAsync(
        await this.createPayload(user),
      ),
    };
  }

  async refresh(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { userId } });
    if (!user) throw new UnauthorizedException();

    return {
      access_token: await this.jwtService.signAsync(await this.createPayload(user)),
    };
  }

  async createPayload(user: User) {
    return {
      sub: user.userId,
      email: user.email,
    };
  }
}
