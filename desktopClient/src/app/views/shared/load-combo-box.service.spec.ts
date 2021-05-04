import { TestBed } from '@angular/core/testing';

import { LoadComboBoxService } from './load-combo-box.service';

describe('LoadComboBoxService', () => {
  let service: LoadComboBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadComboBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
