import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): any {
    return {
      uptime: process.uptime(),
      message: 'running',
      timestamp: Date.now()
    };
  }
}
