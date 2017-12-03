import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData: any;
  userData = {"username" : "", "password" : "", "name" : "", "email" : ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    this.authservice.postData(this.userData, 'signup').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      this.navCtrl.push(TabsPage);
    }, (err) => {
      console.log(err);
    });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
