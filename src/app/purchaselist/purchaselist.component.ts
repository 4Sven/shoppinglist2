import { Component, OnInit } 		from '@angular/core';
import { Purchase, PurchaseList }	from '../purchase';
import { MessageService } 			from '../message.service';
import { PurchaseService }			from '../purchase.service';


@Component({
  selector: 'app-purchaselist',
  templateUrl: './purchaselist.component.html',
  styleUrls: ['./purchaselist.component.css']
})
export class PurchaselistComponent implements OnInit {

  constructor(
    private purchaseService: PurchaseService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getPurchases();
  }

  purchases : PurchaseList[];

  getPurchases(): void {
    this.purchaseService.getPurchases()
      .subscribe(purchases => {
        this.purchases = purchases;
        console.log('PurchaseListComponent', this.purchases);
      })
  }

  cleanPurchases(): void {
    this.purchaseService.deletePurchases()
      .subscribe(purchases => {
        console.log('Purchase delete');
      })
      this.getPurchases();
  }

}
