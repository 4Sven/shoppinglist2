import { Injectable } from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { catchError, map, tap }    from 'rxjs/operators';
import { of }                      from 'rxjs/observable/of';
import { HttpClient, HttpHeaders,
         HttpParams,
         HttpResponse }            from '@angular/common/http';

import { MessageService }          from './message.service';
import { Categories }              from './categories';

@Injectable()
export class CategoriesService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
) { }

  private categoriesUrl = 'http://192.168.178.11:1338/api/categories';
 
  private log(message: string) {
    this.messageService.addAlert('info', 'CategoriesService: ' + message);
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

  // Rückgabe einer Liste von Kategorien
  getCategories (): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.categoriesUrl)
      .pipe(
        //tap(meals => { console.log(meals.headers)  }),
        catchError(this.handleError<Categories[]>('getCategories'))
      );
  };

  // Rückgabe einer Kategorie
  getCategory (id: number): Observable<Categories> {
    return this.http.get<Categories>(this.categoriesUrl + '/' + id)
      .pipe(
        catchError(this.handleError<Categories>('getCategory'))
      )
  }

  updateCategory (updateData: Categories): Observable<any> {
    return this.http.put<Categories>(this.categoriesUrl + '/' + updateData.id, { 
          update: {'name': updateData.name,
                   'position': updateData.position}} 
        )
      .pipe(
        //tap(data => {this.log(`updated category`)}),
        catchError(this.handleError<any>('update Category'))
      )
  }

  addCategory (addData: Categories): Observable<any> {
    return this.http.post<Categories>(this.categoriesUrl, {
      add: { 'name': addData.name,
             'position': addData.position
      }
    })
  }


  dropCategory (dropData: Categories): Observable<any> {  
    return this.http.delete<Categories>(this.categoriesUrl + '/' + dropData.id)
      .pipe(
        tap(data => {this.log(`category deleted`); console.log(data)}),
        catchError(this.handleError<any>('deleteCategory'))
      );
  }

}
