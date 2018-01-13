import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { Location }                 from '@angular/common';

import { Item }                     from '../item';
import { ItemService }              from '../item.service';
import { MessageService }           from '../message.service';
import { Categories }               from '../categories';
import { CategoriesService }        from '../categories.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  mode: string;
  lastItem: number;
  categories : Categories[];

  @Input() item: Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private categoriesService: CategoriesService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    switch (this.route.snapshot.url.toString()) {
      case 'createitem':
        this.item = new Item;
        this.mode = "add";
        break;
      default:
        this.getItem();
        this.mode = "update";
    }
    this.getCategories();
  }

  getItem(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id)
      .subscribe(data => { this.item = data[0] });
  }

  getCategories(): void {
    this.categoriesService.getCategories()
      .subscribe(categories => this.categories = categories)
  }



  goBack(): void {
    this.location.back();
  }
}
