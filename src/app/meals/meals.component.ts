import { Component, OnInit } from '@angular/core';

import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { MessageService } from '../message.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  constructor(private mealService: MealService,
              private messageService: MessageService,
              private menuService: MenuService
  ) { }

  count: number;
  meals: Meal[];
  page : number;     // current page
  pageSize : number; // Number of Items per page
  maxSize : number;  // Maximum number of pages to display
  fSearch : string;  // Suchfeld

  addMenu( meal_id: number ) {
    //this.messageService.addAlert('info','swipe right for id ' + meal_id);
    this.menuService.addMeals(meal_id)
      .subscribe(data => {
        //this.messageService.addAlert('info', data.toString())
      });
    this.getMeals(this.page);
  };

  getMeals(page:number): void {
    console.log('getMeals Page', page);
    this.messageService.setPaginator(page);
    this.mealService.getMeals(this.page, this.fSearch)
      .subscribe(data => {
        this.count = data.headers.get('X-Total-Count'),
        this.meals = data.body
      })
  }

  ngOnInit() {
    console.log('meals component onInit');
    if (this.messageService.getPaginator()) {
      this.page = this.messageService.getPaginator();
      console.log('ngOnInit set page to Paginator');
    } else {
      console.log('ngOnInit set page to 1');
      this.page = 1
    }
    this.pageSize = 10;
    
    this.getMeals(this.page);
  }

search(searchString: string): void {
  this.getMeals(this.page);
}

}
