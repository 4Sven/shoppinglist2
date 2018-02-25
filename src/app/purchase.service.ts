import { Injectable } from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { catchError, map, tap }    from 'rxjs/operators';
import { of }                      from 'rxjs/observable/of';
import { HttpClient, HttpHeaders,
         HttpParams,
         HttpResponse }            from '@angular/common/http';

import { MessageService }          from './message.service';
import { Purchase, PurchaseList }  from './purchase';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PurchaseService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { };

  private purchaseUrl = 'http://192.168.178.11:1338/api/purchases';
 
  private log(message: string) {
    this.messageService.addAlert('info', 'PurchaseService: ' + message);
  };

  private alert (type: string, message: string) {
    this.messageService.addAlert(type, message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.alert('warning', `${operation} failed: ${error.error}`);
      return of(result as T);
    };
  }

  // Rückgabe einer Einkaufsliste
  getPurchases (): Observable<PurchaseList[]> {
    return this.http.get<PurchaseList[]>(this.purchaseUrl)
      .pipe(
        //tap(purchases => { console.log(purchases)  }),
        catchError(this.handleError<PurchaseList[]>('getPurchases'))
      );
  };

  // Artikel zur Einkaufsliste hinzufügen
  addPurchases (item:number): Observable<any> {
    return this.http.post(this.purchaseUrl + '/' + item.toString(), {add: item.toString()})
      .pipe(
        catchError(this.handleError<any>('addPurchases'))
      );
  };

  // Liste leeren
  deletePurchases (): Observable<any> {
    return this.http.delete(this.purchaseUrl)
      .pipe(
        catchError(this.handleError<any>('deletePurchases'))
      );
  };

}
