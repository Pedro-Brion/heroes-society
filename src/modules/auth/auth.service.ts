import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EntityNotFound } from 'src/config/exception.config';
import { User } from '../users/models/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Identify current user
   * @param {string} id User to be added
   */
  async me(id: string): Promise<any> {
    let user: User;
    if (id) {
      try {
        user = await this.usersService.userById(id);
      } catch (err) {
        if (err instanceof EntityNotFound) {
          user = await this.usersService.newUser();
        } else throw err;
      }
    } else {
      user = await this.usersService.newUser();
    }

    const access_token = await this.jwtService.signAsync(
      Object.assign({}, user),
    );

    return { user, access_token };
  }
}
