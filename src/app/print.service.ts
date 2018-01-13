import { Injectable } from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { catchError, map, tap }    from 'rxjs/operators';
import { of }                      from 'rxjs/observable/of';
import { HttpClient, HttpHeaders,
         HttpParams,
         HttpResponse }            from '@angular/common/http';
import { MessageService }          from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PrintService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private printUrl = 'http://192.168.178.11:1338/api/print';
 
  private log(message: string) {
    this.messageService.addAlert('info', 'printService: ' + message);
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

  printMenu (mealData:any): Observable<any> {
    return this.http.post(this.printUrl, { 
          print: mealData
        }, httpOptions)
      .pipe(
        //tap(data => {this.log(`meal added`); console.log(data)}),
        catchError(this.handleError('printMenu'))
      );
  }

}
