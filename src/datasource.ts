/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource, DataSourceOptions } from 'typeorm';

export const datasourceOptionsMaster: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '@Kenza123',
  database: 'pay-me',
  entities: [__dirname + '/entity/*{.js,.ts}'],
  synchronize: true,
};
export const primaryDataSource: DataSource = new DataSource(
  datasourceOptionsMaster,
);
export const datasourceOptionsSlave: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '@Kenza123',
  database: 'slave_rep',
  entities: [__dirname + '/entity/*{.js,.ts}'],
  synchronize: true,
};
export const secondaryDataSource = new DataSource(datasourceOptionsSlave);
