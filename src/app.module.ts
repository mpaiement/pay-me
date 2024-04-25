import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BanqueModule } from './banque/banque.module';
import { CarteCIBModule } from './carteCIB/carteCIB.module';
import { QrcodeModule} from './qrcode/qrcode.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { MarchandModule } from './marchand/marchand.module';

@Module({
  imports: [UserModule,TransactionModule,MarchandModule, BanqueModule, QrcodeModule, CarteCIBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
