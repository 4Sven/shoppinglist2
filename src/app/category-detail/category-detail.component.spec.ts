import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable }              from 'rxjs/Observable';
import { of }                      from 'rxjs/observable/of';
import { Location }                 from '@angular/common';

import { CategoryDetailComponent } from './category-detail.component';
import { CategoriesService }        from '../categories.service';
import { MessageService }           from '../message.service';
import { Message }                  from '../message';

describe('CategoryDetailComponent', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ 
        CategoryDetailComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 2})
          }
        },
        {
          provide: CategoriesService
        },
        {
          provide: Location
        },
        {
          provide: MessageService, useClass: MessageService
        }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
