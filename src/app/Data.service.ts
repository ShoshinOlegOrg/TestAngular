import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MessageInfo } from './MessageInfo';

@Injectable(
  // {providedIn: 'root'}
)
export class DataService {

  private urlGet = "/api/db/topic";
  private urlAddMessage = "/api/db/message";

  constructor(private http: HttpClient) {
    //this.http.post()
   }

  getTopics() {
    return this.http.get(this.urlGet);
  }

  addMessage(messageInfo: MessageInfo) {
    //const myHeaders = new HttpHeaders().set('Access-Control-Allow-Origin',);
    return this.http.post(this.urlAddMessage, messageInfo);
  }
 

}
