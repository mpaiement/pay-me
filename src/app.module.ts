import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { MarchandModule } from './marchand/marchand.module';
@Module({
  imports: [UserModule,TransactionModule,MarchandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
