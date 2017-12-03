import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userDetails: any;
  responseData: any;

  userPostData = {"_id": "", "token": ""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,  public app: App) {

    const data = JSON.parse(localStorage.getItem('userData'));
    console.log(data);
    this.userDetails = data;
    
    this.userPostData._id = this.userDetails._id;
    this.userPostData.token = this.userDetails.token;




  }
showData(){
  console.log('neelmani')
  this.authService.getThoughts(this.userDetails).then((result) => {
        this.responseData = result;
        console.log(result)
        // Hide the loader.
        //loader.dismiss();
        console.log(this.responseData.thoughts);
        if(!this.responseData.thoughts){
          console.log('token not present')
        } else {
          localStorage.setItem('thoughts', JSON.stringify(this.responseData));
          console.log('hhhhhhhhhhhhhhh  ' + this.responseData)
          //this.navCtrl.push(TabsPage);
        }
      }, (err) => {
        //loader.dismiss();
        console.log(err);
      });
    

}
  backToWelcome() {
   const root = this.app.getRootNav();
   root.popToRoot();
  }

  logout(){
     localStorage.clear();
     setTimeout(() => this.backToWelcome(), 1000);
  }

}
