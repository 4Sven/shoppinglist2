import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { catchError, map, tap }    from 'rxjs/operators';
import { of }                      from 'rxjs/observable/of';
import { HttpClient, HttpHeaders,
         HttpParams,
         HttpResponse }            from '@angular/common/http';

import { MessageService }          from './message.service';
import { Meal, 
         oneMeal, Meals }          from './meal';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class MealService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { };

  private mealUrl = 'http://192.168.178.11:1338/api/meals';
 
  private log(message: string) {
    this.messageService.addAlert('info', 'MealService: ' + message);
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

  // Rückgabe einer Liste von Meals
  getMeals (page:number): Observable<any> {
    let httpParams = new HttpParams().set('where', '%')
      .set('orderBy', 'meal_name')
      .set('page', page.toString())
      .set('items', '10');
    //this.messageService.add('Debug: ' + httpParams);
    return this.http.get(this.mealUrl, { params: httpParams, observe: 'response'} )
      .pipe(
        //tap(meals => { console.log(meals.headers)  }),
        catchError(this.handleError<any>('getMeals'))
      );
  };

  // Rückgabe eines Meal's
  getMeal (id:number): Observable<Meal> {
    //this.messageService.add(`MealService: fetched meal_id=${id}`);
    return this.http.get<Meal>(this.mealUrl + '/' + id)
      .pipe(
        tap((meal: Meal) => {
          if (meal) { 
            //this.log(`fetched meal ${meal.meal_id}`)
          } else {
            this.alert('danger', `I don't know this meal!`)
          }
        }),
        catchError(this.handleError<Meal>('getMeal'))
      );
  }

  updateMeal (updateData: Meal): Observable<any> {
    return this.http.put<Meal>(this.mealUrl + '/' + updateData.meal_id, { 
          update: {'meal_name': updateData.meal_name}} 
        )
      .pipe(
        tap(data => {this.log(`updated meal`)}),
        catchError(this.handleError<any>('update Meal'))
      )
  }

  createMeal (createData: Meal): Observable<any> {
    return this.http.post<Meal>(this.mealUrl, { 
          add: {'meal_name': createData.meal_name}
        }, httpOptions)
      .pipe(
        tap(data => {this.log(`meal added`); console.log(data)}),
        catchError(this.handleError<Meal>('addMeal'))
      );
  }

  dropMeal (dropData: Meal): Observable<any> {  
    return this.http.delete<Meal>(this.mealUrl + '/' + dropData.meal_id)
      .pipe(
        tap(data => {this.log(`meal deleted`); console.log(data)}),
        catchError(this.handleError<any>('deleteMeal'))
      );
  }

}
