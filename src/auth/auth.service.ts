import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthStateResponse } from './types/auth-state-response.type';
import { AuthSessionResponse } from './types/auth-session-response.type';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { type UserSessionState, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthSessionResponse> {
    const user = await this.usersService.findByEmailWithPassword(
      loginDto.email,
    );

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await compare(loginDto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const sessionState = await this.usersService.findById(user.id);

    if (!sessionState) {
      throw new UnauthorizedException('Session is no longer valid');
    }

    return this.buildSessionResponse(sessionState);
  }

  async register(registerDto: RegisterDto): Promise<AuthSessionResponse> {
    const user = await this.usersService.create({
      firstNames: registerDto.firstName,
      lastNames: registerDto.lastName,
      phone: registerDto.phone,
      email: registerDto.email,
      password: registerDto.password,
      businessName: registerDto.businessName,
      businessCategory: registerDto.businessCategory,
    });

    return this.buildSessionResponse(user);
  }

  async me(userId: string): Promise<AuthStateResponse> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Session is no longer valid');
    }

    return this.buildAuthStateResponse(user);
  }

  private async buildSessionResponse(
    user: UserSessionState,
  ): Promise<AuthSessionResponse> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    const publicUser = this.usersService.toPublicUser(user);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: Number(
        this.configService.get<number>('JWT_EXPIRES_IN', 86400),
      ),
      requiresOnboarding: this.usersService.requiresOnboarding(user),
      user: publicUser,
    };
  }

  private buildAuthStateResponse(user: UserSessionState): AuthStateResponse {
    const publicUser = this.usersService.toPublicUser(user);

    return {
      requiresOnboarding: this.usersService.requiresOnboarding(user),
      user: publicUser,
    };
  }
}
