import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { catchError, map, tap }    from 'rxjs/operators';
import { of }                      from 'rxjs/observable/of';
import { HttpClient, HttpHeaders,
         HttpParams,
         HttpResponse }            from '@angular/common/http';

import { MessageService }          from './message.service';
import { AuthenticationDetails,
         CognitoUser,
         CognitoUserAttribute,
         CognitoUserPool }         from 'amazon-cognito-identity-js';


const PoolData = {
  UserPoolId: 'eu-central-1_PrkwB3NiI',
  ClientId: '3hisfu5457oiklvnmk2dsrbdas'	
};

const userPool = new CognitoUserPool(PoolData);

@Injectable()
export class UserAuthService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

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

  signinUser(username: string, password: string): Observable<any> {
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return null;
  }





}
