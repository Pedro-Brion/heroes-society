import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { EntityNotFound } from 'src/config/exception.config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { fakeName } from '../utils';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}
  /**
   * List all users and the total count
   * @param {string} search Name to query
   * @returns {object} Data and total count
   */
  async listAll(search: string = ''): Promise<User[]> {
    return this.usersRepo.find();
  }

  /**
   * Find a user providing a ID
   * @param id User id to be found
   * @returns {User}
   */
  async userById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new EntityNotFound('User');
    else return user;
  }

  /**
   * Create a user
   * @param {User} user User to be added
   */
  newUser(): Promise<User> {
    const user = this.usersRepo.create();
    user.name = fakeName();
    return this.usersRepo.save(user);
  }

  /**
   *
   * @param id User id to be deleted
   * @returns
   */
  deleteUser(id: string) {
    //TODO
  }
}
