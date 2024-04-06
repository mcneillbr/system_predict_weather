import { Test, TestingModule } from '@nestjs/testing';
import { CiotdService } from './ciotd.service';

describe('CiotdService', () => {
  let service: CiotdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiotdService],
    }).compile();

    service = module.get<CiotdService>(CiotdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
