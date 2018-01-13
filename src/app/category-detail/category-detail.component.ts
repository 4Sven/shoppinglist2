import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { Location }                 from '@angular/common';

import { Categories }               from '../categories';
import { CategoriesService }        from '../categories.service';
import { MessageService }           from '../message.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  mode: string;

  @Input() categories: Categories;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    switch (this.route.snapshot.url.toString()) {
      case 'createcategories':
        this.categories = new Categories;
        this.mode = "add";
        break;
      default:
        this.getCategory();
        this.mode = "update";
    }
  }

  getCategory(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoriesService.getCategory(id)
      .subscribe(data => { this.categories = data[0] });
  }

  reset(): void {
    this.categories = new Categories;
  }

  onSubmit(): void {
    //this.messageService.addAlert('info', 'Speichern gedrückt');
    this.categoriesService.updateCategory(this.categories)
      .subscribe(category => { });
    this.location.back();
  }

  newCategory(): void {
    this.categoriesService.addCategory(this.categories)
      .subscribe(category => { });
    this.location.back();
  }

  deleteCategory(): void {
    this.categoriesService.dropCategory(this.categories)
      .subscribe(data => {});
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }
}
