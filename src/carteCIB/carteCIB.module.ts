import { Module } from '@nestjs/common';
import { CarteCIBService } from './carteCIB.service';
import { CarteCIBController } from './carteCIB.controller';

@Module({
  imports: [],
  controllers: [CarteCIBController],
  providers: [CarteCIBService],
})
export class CarteCIBModule {}