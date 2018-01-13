import { Injectable } from '@angular/core';

import { Message }    from './message';

@Injectable()
export class MessageService {
  messages: string[] = [];
  alerts : Message[] = [];
  paginator : number;

  setPaginator(page: number) {
    this.paginator = page;
    //console.log('setPaginator', this.paginator);
  }

  getPaginator() {
    //console.log('getPaginator', this.paginator);
    return this.paginator;
  }

  add(message: string) {
    //this.messages.push(message);
    this.addAlert('Info', message);
  }

  addAlert (type: string, message: string) {
    let alert = new Message;
    alert.type = type;
    alert.message = message;
    this.alerts.push(alert);
  }

  clear() {
    this.messages = [];
  }

  closeAlert (alert: Message) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  constructor() { }

}
