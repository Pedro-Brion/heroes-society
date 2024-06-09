import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'storage/hs.db.sqlite',
  entities: ['dist/src/modules/**/models/*.entity.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceConfig);
export default dataSource;
