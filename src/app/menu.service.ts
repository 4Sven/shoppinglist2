import { Injectable } from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { catchError, map, tap }    from 'rxjs/operators';
import { of }                      from 'rxjs/observable/of';
import { HttpClient, HttpHeaders,
         HttpParams,
         HttpResponse }            from '@angular/common/http';

import { MessageService }          from './message.service';
import { Meal }                    from './meal';

@Injectable()
export class MenuService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private mealUrl = 'http://192.168.178.11:1338/api/menus';
 
  private log(message: string) {
    this.messageService.addAlert('info', 'MealService: ' + message);
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

  // Rückgabe einer Liste von Meals als Menü
  getMeals (): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.mealUrl)
      .pipe(
        //tap(meals => { console.log(meals.headers)  }),
        catchError(this.handleError<Meal[]>('getMealsForMenu'))
      );
  };

  addMeals ( id: number ): Observable<any> {
    console.log('addMeals for Menu ' + id);
    return this.http.put<any>(this.mealUrl + '/' + id, {   } )
      .pipe(
        //tap(ret => { console.log(ret) }),
        catchError(this.handleError<any>('addMealsForMenu'))
      );
  };

  deleteMenuItem (item: number): Observable<any> {
    return this.http.delete(this.mealUrl + '/' + item)
      .pipe(
        catchError(this.handleError<any>('deleteMenuItem'))
      );
  };

  clearMenu (): Observable<any> {
    return this.http.delete(this.mealUrl)
      .pipe(
        catchError(this.handleError<any>('clearMenu'))
      );
  };
}
