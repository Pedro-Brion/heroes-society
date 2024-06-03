import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 10001,
      name: 'Pedro',
      age: 26,
      isAdmin: true,
    },
  ];

  getAll(search?: string): { data: User[]; count: number } {
    if (search) {
      const result = this.users.filter((_user) =>
        _user.name.toLowerCase().includes(search.toLowerCase()),
      );
      return {
        data: result,
        count: result.length,
      };
    }
    return { data: this.users, count: this.users.length };
  }

  create(user: User) {
    this.users.push(user);
  }
}
