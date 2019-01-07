import { TestBed } from '@angular/core/testing';

import { PortTableService } from './port-table.service';

describe('PortTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortTableService = TestBed.get(PortTableService);
    expect(service).toBeTruthy();
  });
});
