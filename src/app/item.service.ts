import { Injectable } from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { catchError, map, tap }    from 'rxjs/operators';
import { of }                      from 'rxjs/observable/of';
import { HttpClient, HttpHeaders,
         HttpParams,
         HttpResponse }            from '@angular/common/http';

import { MessageService }          from './message.service';
import { Item  }                   from './item';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ItemService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private itemUrl = 'http://192.168.178.11:1338/api/items';
 
  private log(message: string) {
    this.messageService.addAlert('info', 'ItemService: ' + message);
  };

  private alert (type: string, message: string) {
    this.messageService.addAlert(type, message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.alert('warning', `${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Rückgabe einer Liste von Items
  getItems (page:number): Observable<any> {
    let httpParams = new HttpParams().set('where', '%')
      .set('orderBy', 'name')
      .set('page', page.toString())
      .set('items', '10');
    //this.messageService.add('Debug: ' + httpParams);
    return this.http.get(this.itemUrl, { params: httpParams, observe: 'response'} )
      .pipe(
        //tap(meals => { console.log(meals.headers)  }),
        catchError(this.handleError<any>('getItems'))
      );
  };

  // Rückgabe eines Item's
  getItem (id:number): Observable<Item> {
    //this.messageService.add(`ItemService: fetched item.id=${id}`);
    return this.http.get<Item>(this.itemUrl + '/' + id)
      .pipe(
        tap((item: Item) => {
          if (item) { 
            //this.log(`fetched meal ${meal.meal_id}`)
          } else {
            this.alert('danger', `I don't know this item!`)
          }
        }),
        catchError(this.handleError<Item>('getItem'))
      );
  }






}
