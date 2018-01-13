import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { MealsComponent }       from './meals/meals.component';
import { MealDetailComponent }  from './meal-detail/meal-detail.component';
import { MenuComponent }        from './menu/menu.component';
import { CategoriesComponent }  from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ItemsComponent }       from './items/items.component';
import { ItemDetailComponent }  from './item-detail/item-detail.component';

const routes: Routes = [
  { path: 'meals', component: MealsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: MealDetailComponent },
  { path: 'createmeal', component: MealDetailComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'createcategories', component: CategoryDetailComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'createitem', component: ItemDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
