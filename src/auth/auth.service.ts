import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { verifyPassword } from './../user/helper';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(userName: string, password: string): Promise<any> {
    const response = await this.singInRoot(userName, password);

    if(response) {
      return response;
    }

    const user = await this.userService.getUser(userName);

    const isCheckPassword = user ? await verifyPassword(password, user.password) : false;

    if (!isCheckPassword) {
      this.logger.warn(`Unable to Sign User ${userName}`);
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.userName, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async singInRoot(username: string, password: string): Promise<any> {
    const rootUserName = this.configService.get<string>('APP_ROOT_USER_NAME');
    const rootPassword = this.configService.get<string>('APP_ROOT_USER_PASSWORD');

    if (rootUserName === username && rootPassword === password) {
      const payload = { sub: 0, username, role: 'root' };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    return null;
  }
}
