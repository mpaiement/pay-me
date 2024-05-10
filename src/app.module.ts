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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '@Kenza123',
      database: 'pay-me',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    TransactionModule,
    MarchandModule,
    AccountModule,
    QrcodeModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
