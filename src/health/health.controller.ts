import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Cron } from '@nestjs/schedule';
import { DataSource, DataSourceOptions } from 'typeorm';
//import { primaryDataSource, secondaryDataSource } from '../datasource';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private configService: ConfigService,
    @Inject('DATABASE_CONNECTION') private dataSource: DataSource,
  ) {}

  @Get()
  @HealthCheck()
  @Cron('*/10 * * * * *')
  async check() {
    const check = await this.health.check([
      () => this.db.pingCheck('database'),
    ]);
    console.log('🚀 ~ check ~ check:', check);

    if (check.status !== 'ok') {
      const x = await this.switchToSlave();
      console.log('🚀 ~ HealthController ~ check ~ x:', x);
      console.log('CA MAAAAAAAAAAAAAARCHE');
    }
  }
  private async switchToSlave() {
    const slaveConfig: DataSourceOptions = {
      type: 'mysql',
      host: this.configService.get<string>('SLAVE_DB_HOST'),
      port: this.configService.get<number>('SLAVE_DB_PORT'),
      username: this.configService.get<string>('SLAVE_DB_USERNAME'),
      password: this.configService.get<string>('SLAVE_DB_PASSWORD'),
      database: this.configService.get<string>('SLAVE_DB_NAME'),
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZATION'),
      logging: this.configService.get<boolean>('DB_LOGGING'),
      entities: [__dirname + '/entity/*{.js,.ts}'],

      //autoLoadEntities: this.configService.get<boolean>('DB_AUTOLOAD_ENTITIES'),
    };
    await this.dataSource.destroy();
    this.dataSource = new DataSource(slaveConfig);
    await this.dataSource.initialize();
  }
}
