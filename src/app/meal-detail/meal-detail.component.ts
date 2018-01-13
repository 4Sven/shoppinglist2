import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { Location }                 from '@angular/common';

import { Meal, oneMeal }            from '../meal';
import { MealService }              from '../meal.service';
import { MessageService }           from '../message.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
  mode: string;
  lastMeal: number;

  @Input() meal: Meal;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    switch (this.route.snapshot.url.toString()) {
      case 'createmeal':
        this.meal = new Meal;
        this.mode = "add";
        break;
      default:
        this.getMeal();
        this.mode = "update";
    }
  }

  getMeal(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.mealService.getMeal(id)
      .subscribe(data => { this.meal = data[0] });
  }

  reset(): void {
    this.meal = new Meal;
  }

  onSubmit(): void {
    //this.messageService.addAlert('info', 'Speichern gedrückt ' + this.meal.meal_id + ' ' + this.meal.meal_name);
    this.mealService.updateMeal(this.meal)
      .subscribe(meal => { });
  }

  newMeal(): void {
    //this.messageService.addAlert('info', 'Hinzufügen gedrückt ' + this.meal.meal_name);
    this.mealService.createMeal(this.meal)
      .subscribe(data => { this.lastMeal = data.insertId });
  }

  deleteMeal(): void {
    this.mealService.dropMeal(this.meal)
      .subscribe(data => {});
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }
}
