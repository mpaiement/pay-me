import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { CardModule } from './card/card.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { MarchandModule } from './marchand/marchand.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DataSource, DataSourceOptions } from 'typeorm';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    /**
     * Load and parse an env file from the root directory dewjdgdjed
     */
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        const dbConfig: any = {
          type: 'mysql',
          host: configService.get<string>('MASTER_DB_HOST'),
          port: configService.get<number>('MASTER_DB_PORT'),
          username: configService.get<string>('MASTER_DB_USERNAME'),
          password: configService.get<string>('MASTER_DB_PASSWORD'),
          database: configService.get<string>('MASTER_DB_NAME'),
          synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
          logging: configService.get<boolean>('DB_LOGGING'),
          autoLoadEntities: configService.get<boolean>('DB_AUTOLOAD_ENTITIES'),
          // entities: ['src/entity/*{.js,.ts}'],
        };

        return dbConfig;
      },
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot(datasourceOptionsMaster),
    UserModule,
    TransactionModule,
    MarchandModule,
    AccountModule,
    QrcodeModule,
    CardModule,
    TerminusModule,
    HttpModule,
    FirebaseModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configService: ConfigService) => {
        const masterConfig: DataSourceOptions = {
          type: 'mysql',
          host: configService.get<string>('MASTER_DB_HOST'),
          port: configService.get<number>('MASTER_DB_PORT'),
          username: configService.get<string>('MASTER_DB_USERNAME'),
          password: configService.get<string>('MASTER_DB_PASSWORD'),
          database: configService.get<string>('MASTER_DB_NAME'),
          synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
          logging: configService.get<boolean>('DB_LOGGING'),
          entities: ['src/entity/*{.js,.ts}'],
          // autoLoadEntities: configService.get<boolean>('DB_AUTOLOAD_ENTITIES'),
        };
        const dataSource = new DataSource(masterConfig);
        await dataSource.initialize();
        return dataSource;
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
