import { Test, TestingModule } from '@nestjs/testing';
import { ActTimeService } from './act-time.service';

describe('ActTimeRideService', () => {
  let service: ActTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActTimeService],
    }).compile();

    service = module.get<ActTimeService>(ActTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
