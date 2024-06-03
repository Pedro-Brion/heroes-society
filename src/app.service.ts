import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  index(): string {
    return 'Api for Heroes Society - v0.0.1';
  }
}
