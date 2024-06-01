import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Cron } from '@nestjs/schedule';


@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Cron('*/30 * * * * *')
  async check() {
    console.log('jsp');
    const check = await this.health.check([async () => this.db.pingCheck('typeorm')]);
    console.log("🚀 ~ HealthController ~ check ~ check:", check.status)
    return check;
    
  }
}
