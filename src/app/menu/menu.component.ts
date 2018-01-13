import { Component, OnInit } from '@angular/core';

import { Meal        } from '../meal';
import { MenuService } from '../menu.service';
import { PrintService } from '../print.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    private printService: PrintService,
    private MessageService: MessageService
  ) { }

  meals: Meal[];

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.menuService.getMeals()
      .subscribe(data => this.meals = data )
  }

  dropMenu(item: number): void {
    this.menuService.deleteMenuItem(item)
      .subscribe(data => { } );
    this.getMenu();
  }

  cleanMenu(): void {
    this.menuService.clearMenu()
      .subscribe(data => { } );
    this.getMenu();
  }

  print(): void {
    this.printService.printMenu(this.meals)
      .subscribe(data => { console.log(data) } );
  }
}
