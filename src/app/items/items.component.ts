import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private purchaseService: PurchaseService
  ) { }

  count: number;
  items: Item[];
  page : number;     // current page
  pageSize : number; // Number of Items per page
  maxSize : number;  // Maximum number of pages to display
  fSearch : string;  // Suchfeld

  ngOnInit() {
    if (this.messageService.getPaginator()) {
      this.page = this.messageService.getPaginator();
    } else {
      this.page = 1
    }
    this.pageSize = 10;
    
    this.getItems(this.page);
  }

  addPurchases(item:number): void {
    this.purchaseService.addPurchases(item)
      .subscribe(data => {
        //this.messageService.addAlert('info', data.toString())
      });
    this.getItems(this.page);
  }

  getItems(page:number): void {
    //console.log('getItems Page', page);
    this.messageService.setPaginator(page);
    this.itemService.getItems(this.page, this.fSearch)
      .subscribe(data => {
        this.count = data.headers.get('X-Total-Count'),
        this.items = data.body
      })
  }

  search(searchString: string): void {
    this.getItems(this.page);
  }


}
