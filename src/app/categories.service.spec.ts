import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule }     from '@angular/common/http';

import { CategoriesService } from './categories.service';
import { MessageService }       from './message.service';

describe('CategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        CategoriesService,
        MessageService, 
      ]
    });
  });

  it('should be created', inject([CategoriesService], (service: CategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
