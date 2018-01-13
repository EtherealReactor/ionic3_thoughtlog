import { Injectable } from '@angular/core';
import { Http, Headers , RequestOptions } from '@angular/http';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';

let apiURL = 'http://107.23.234.81:10010/users/'

//let apiURL = 'http://localhost:10010/users/';
//let apiThoughtURL = 'http://107.23.234.81:10010/thoughts?page=1&limit=10&user_id=5a0c7aadf9ba395dfb4e8bdb';
let apiThoughtURL = 'http://localhost:10010/thoughts?page=1&limit=10';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http, private network: Network) {
    console.log('Hello AuthServiceProvider Provider');
  }

  isOnline(): boolean {
   // console.log(this.network.type);
    //if(this.network.type != 'none'){
    //  return true;
    //} else {
     // return false;
    //}
    return true;
  }
  
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      //let options = new Headers();
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      
      this.http.post(apiURL + type, JSON.stringify(credentials), options).
      subscribe(res => {
      console.log(res);
        resolve(res.json());
      }, (err) => {
      console.log(err);
        reject(err);
      });
    });
  }

  getThoughts(userDetails){
    return new Promise((resolve, reject) => {
      //let options = new Headers();
      let headers = new Headers() //{ 'Content-Type': 'application/json' });
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      headers.append('Authorization',  userDetails.token);
      let options = new RequestOptions({ headers: headers });
      
      this.http.get(apiThoughtURL , options).
      subscribe(res => {
      console.log(res.json());
        resolve(res.json());
      }, (err) => {
      console.log(err);
        reject(err);
      });
    });

  }


  saveThoughts(thoughtData){
    return new Promise((resolve, reject) => {
      //let options = new Headers();
      let headers = new Headers() //{ 'Content-Type': 'application/json' });
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      headers.append('Authorization',  thoughtData.token);
      let options = new RequestOptions({ headers: headers });
      
      this.http.post(apiThoughtURL , options).
      subscribe(res => {
      console.log(res.json());
        resolve(res.json());
      }, (err) => {
      console.log(err);
        reject(err);
      });
    });

  }

}
