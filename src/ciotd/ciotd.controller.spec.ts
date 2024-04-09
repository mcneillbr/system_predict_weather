import { Test, TestingModule } from '@nestjs/testing';
import { CiotdController } from './ciotd.controller';

describe('CiotdController', () => {
  let controller: CiotdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiotdController],
    }).compile();

    controller = module.get<CiotdController>(CiotdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
