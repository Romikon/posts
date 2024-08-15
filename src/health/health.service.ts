import { Injectable } from '@nestjs/common';
import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 1024 * 1024 * 1024),
    ]);
  }
}
