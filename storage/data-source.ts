import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host:'localhost',
  port: 5432,
  username: 'postgres',
  database:'heroes-society',
  password: ',.;',
  entities: ['dist/src/modules/**/models/*.entity.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceConfig);
export default dataSource;