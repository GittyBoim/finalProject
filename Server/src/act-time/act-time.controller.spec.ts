import { Test, TestingModule } from '@nestjs/testing';
import { ActTimeController } from './act-time.controller';

describe('ActTimeRideController', () => {
  let controller: ActTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActTimeController],
    }).compile();

    controller = module.get<ActTimeController>(ActTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
