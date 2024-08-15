import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: true,
      errorLogStyle: 'json',
    }),
  ],
  controllers: [HealthController],
  providers: [HealthService, HealthResolver],
})
export class HealthModule {}
