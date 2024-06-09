import { User } from '../models/user.entity';

export interface GetAllQueryDTO {
  search: string;
}

export interface GetAllRespose {
  data: User[];
  count: number;
}
