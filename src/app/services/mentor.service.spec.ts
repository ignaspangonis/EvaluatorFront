import { HttpClientModule } from '@angular/common/http';
import { MentorService } from './mentor.service';
import { TestBed } from '@angular/core/testing';

describe('MentorService', () => {
  let service: MentorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(MentorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
