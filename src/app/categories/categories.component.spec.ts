import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }          from '@angular/forms';
import { APP_BASE_HREF }        from '@angular/common';
import { HttpClientModule }     from '@angular/common/http';
import { By }                   from '@angular/platform-browser';
import { DebugElement }         from '@angular/core';
import { AppRoutingModule }     from '../app-routing.module';
import { MealsComponent }       from '../meals/meals.component';
import { MealDetailComponent }  from '../meal-detail/meal-detail.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { MenuComponent }        from '../menu/menu.component';
import { ItemsComponent }       from '../items/items.component';
import { ItemDetailComponent }  from '../item-detail/item-detail.component';
import { MessageService }       from '../message.service';

import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { CategoriesService } from '../categories.service';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoriesService: CategoriesService;
  let de: DebugElement;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule.forRoot()
      ],
      declarations: [ 
        DashboardComponent,
        MenuComponent,
        MealsComponent,
        MealDetailComponent,
        CategoriesComponent, 
        CategoryDetailComponent,
        ItemsComponent,
        ItemDetailComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        CategoriesService,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    categoriesService = fixture.debugElement.injector.get(CategoriesService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show categories before OnInit', () => {
    //expect(el.textContent).toBe('', 'nothing displayed');
    //expect(spy.calls.any()).toBe(false, 'getCategories not yet called');
  });



});
