import { Query, Resolver } from '@nestjs/graphql';
import { HealthService } from './health.service';

@Resolver()
export class HealthResolver {
  constructor(private readonly healthService: HealthService) {}

  @Query(() => Number, { name: 'health' })
  qryHealth() {
    return this.healthService.check();
  }
}
