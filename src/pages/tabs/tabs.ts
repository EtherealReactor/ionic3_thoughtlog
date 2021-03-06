import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';

import { HomePage } from '../home/home';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = LoginPage;

  constructor(public navCtrl: NavController, public app: App) {

  }

  logout() {
    const root = this.app.getRootNav();
    console.log('llll ', root)
    localStorage.clear();
    root.popToRoot();

    //localStorage.clear();
     //setTimeout(() => this.backToWelcome(), 1000);
  }
}
