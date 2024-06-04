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
import { HealthModule } from './health/health.module';
import { ScheduleModule } from '@nestjs/schedule';

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
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
          logging: configService.get<boolean>('DB_LOGGING'),
          autoLoadEntities: configService.get<boolean>('DB_AUTOLOAD_ENTITIES'),
        };

        return dbConfig;
      },
      inject: [ConfigService],
    }),
    UserModule,
    TransactionModule,
    MarchandModule,
    AccountModule,
    QrcodeModule,
    CardModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
