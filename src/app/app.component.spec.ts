import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule }    from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }          from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MealsComponent }       from './meals/meals.component';
import { MealDetailComponent }  from './meal-detail/meal-detail.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MessagesComponent }    from './messages/messages.component';
import { APP_BASE_HREF } from '@angular/common';
import { MessageService }       from './message.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        NgbModule.forRoot(),
        FormsModule
      ],
      declarations: [
        AppComponent,
        MenuComponent,
        MessagesComponent,
        ItemsComponent,
        ItemDetailComponent,
        CategoriesComponent,
        CategoryDetailComponent,
        DashboardComponent,
        MealDetailComponent,
        MealsComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        MessageService
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Haushaltsplaner 2.0'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Haushaltsplaner 2.0');
  }));

  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const element  = compiled.querySelector('span.navbar-brand');
    const text     = element.innerText;
    expect(text).toContain('Haushaltsplaner 2.0');
  }));

});
