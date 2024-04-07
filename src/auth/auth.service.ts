import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { verifyPassword } from './../user/helper';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username);

    const isCheckPassword = user ? await verifyPassword(password, user.password) : false;

    if (!isCheckPassword) {
      this.logger.warn(`Unable to Sign User ${username}`);
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.userName, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
