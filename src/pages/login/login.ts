import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Network } from '@ionic-native/network';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  resposeData : any;
  loader:any;
  userData = {"email":"", "password":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, private alertCtrl: AlertController, public loadingCtrl: LoadingController, private network: Network) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {

    if(this.authService.isOnline()){
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();

      setTimeout(() => {
        loader.dismiss();
      }, 1000);

      //this.navCtrl.push(TabsPage, {}, {animate: false});
      this.authService.postData(this.userData, "signin").then((result) => {
        this.resposeData = result;
        console.log(result)
        // Hide the loader.
        loader.dismiss();
        console.log(this.resposeData.token);
        if(!this.resposeData.token){
          let alert = this.alertCtrl.create({
            title: 'Invalid user',
            subTitle: 'Please try again!',
            buttons: ['Okay']
          });
          alert.present();
        } else {
          localStorage.setItem('userData', JSON.stringify(this.resposeData));
          console.log('hhhhhhhhhhhhhhh')
          this.navCtrl.push(TabsPage);
        }
      }, (err) => {
        loader.dismiss();
        console.log(err);
      });
    }else{
      let alert = this.alertCtrl.create({
        title: 'Connection Status',
        subTitle: "No internet connection",
        buttons: ['Okay']
      });
      alert.present();
    }

    
  }
}
