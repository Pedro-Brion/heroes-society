import { DataSource } from 'typeorm';
import { readFile } from 'node:fs/promises';
import { User } from '../src/modules/users/models/user.entity';

async function seedDatabase() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'storage/hs.db.sqlite',
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
      await userRepository.save(newUser);
    }
  } catch (err) {
    console.error(err);
  } finally {
    dataSource.destroy();
  }
}

seedDatabase();
