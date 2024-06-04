import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.types';
import { DataService } from 'src/data/data.service';
import { DataConsumerService } from 'src/data/dataConsumer.interface';

@Injectable()
export class UsersService extends DataConsumerService {
  private users: User[] = [];
  readonly fileName = 'users';

  constructor(private dataService: DataService) {
    super();
    this.retrieveData();
  }

  async retrieveData() {
    this.users = await this.dataService.read(this.fileName);
    console.log(this.users);
  }

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
    this.dataService.write(this.fileName, this.users);
  }
}
