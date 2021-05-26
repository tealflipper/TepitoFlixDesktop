import { TestBed } from '@angular/core/testing';

import { SoapService } from './soap.service';

describe('SoapService', () => {
  let service: SoapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
