import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpClientModule }     from '@angular/common/http';
import { Logger }               from 'angular2-logger/core';

import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }         from './app.component';
import { MealsComponent }       from './meals/meals.component';
import { MealDetailComponent }  from './meal-detail/meal-detail.component';
import { MessagesComponent }    from './messages/messages.component';

import { MealService }          from './meal.service';
import { MessageService }       from './message.service';
import { AppRoutingModule }     from './app-routing.module';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MenuService } from './menu.service';
import { MenuComponent } from './menu/menu.component';
import { PrintService } from './print.service';
import { CategoriesService } from './categories.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemService } from './item.service';
import { UserAuthService } from './user-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MealsComponent,
    MealDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MenuComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    ItemsComponent,
    ItemDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    MealService, 
    MessageService, 
    MenuService, 
    PrintService, 
    CategoriesService, 
    ItemService, UserAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
