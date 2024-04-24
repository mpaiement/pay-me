import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BanqueModule } from './banque/banque.module';
import { CarteCIBModule } from './carteCIB/carteCIB.module';
import { QrcodeModule} from './qrcode/qrcode.module';

@Module({
  imports: [BanqueModule, QrcodeModule, CarteCIBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
