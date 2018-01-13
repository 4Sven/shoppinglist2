import { Component, OnInit } from '@angular/core';

import { Categories } from '../categories';
import { CategoriesService } from '../categories.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private categoriesService : CategoriesService,
    private messageService : MessageService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  categories : Categories[];

  getCategories(): void {
    this.categoriesService.getCategories()
      .subscribe(categories => this.categories = categories)
  }



}
