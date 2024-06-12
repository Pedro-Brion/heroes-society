import { Inject, Injectable } from '@nestjs/common';
import { User, UserRepository } from './models/user.entity';
import { GetAllRespose } from './dto/list-users.dto';
import { EntityNotFound } from 'src/config/expection.config';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import fakeName from '../utils/fakeName';

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
  userById(id: string) {
    //TODO
  }

  /**
   * Create a user
   * @param {User} user User to be added
   */
  newUser() {
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
