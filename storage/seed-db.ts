import { DataSource } from 'typeorm';
import { readFile } from 'node:fs/promises';
import { User } from '../src/modules/users/models/user.entity';
import { dataSourceConfig } from './data-source';
import { fakeName } from '../src/modules/utils';

async function seedDatabase() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    database: 'heroes-society',
    password: ',.;',
    entities: [User],
    synchronize: true,
  });
  await dataSource.initialize();

  try {
    const fileContents = await readFile(`./storage/users.json`, {
      encoding: 'utf-8',
    });
    const jsonData = JSON.parse(fileContents);
    const users: User[] = jsonData.data;

    const userRepository = dataSource.getRepository(User);
    for (const user of users) {
      const newUser = userRepository.create(user);
      newUser.name = fakeName();
      await userRepository.save(newUser);
    }
    console.log("Database seeded successfully");
    console.log("Users added: ", users.length);
    console.log("Users added: ", users);
  } catch (err) {
    console.error(err);
  } finally {
    dataSource.destroy();
  }
}

seedDatabase();
