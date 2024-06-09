import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { DataService } from 'src/data/data.service';
import { DataConsumerService } from 'src/data/dataConsumer.class';
import { GetAllRespose } from './dto/list-users.dto';
import { EntityNotFound } from 'src/config/expection.config';

@Injectable()
export class UsersService extends DataConsumerService<User> {
  readonly fileName = 'users';

  constructor(protected dataService: DataService) {
    super();
    this.retrieveData();
  }

  /**
   * List all users and the total count
   * @param {string} search Name to query
   * @returns {object} Data and total count
   */
  listAll(search: string = ''): GetAllRespose {
    const result = { data: [], count: 0 };
    result.data = this.data.filter((_user) =>
      _user.name.toLowerCase().includes(search.toLowerCase()),
    );

    result.count = result.data.length;

    return result;
  }

  /**
   * Find a user providing a ID
   * @param id User id to be found
   * @returns {User}
   */
  userById(id: number): User {
    const user = this.data.find((_user) => _user.id === id);
    if (!user) throw new EntityNotFound('User');
    return user;
  }

  /**
   * Create a user
   * @param {User} user User to be added
   */
  create(user: User) {
    user.id = Math.floor(Math.random() * 99999);
    this.data.push(user);
    this.save();
  }

  /**
   *
   * @param id User id to be deleted
   * @returns
   */
  deleteUser(id: number): User {
    const user = this.userById(id);
    this.data = this.data.filter((_user) => _user.id !== id);
    this.save();
    return user;
  }

  /**
   * Toggles a user admin flag
   * @param id User id to toggle admin
   * @returns {User}
   */
  toggleAdmin(id: number): User {
    this.data = this.data.map((_user) =>
      _user.id === id ? { ..._user, isAdmin: !_user.isAdmin } : _user,
    );
    this.save();
    return this.userById(id);
  }
}
