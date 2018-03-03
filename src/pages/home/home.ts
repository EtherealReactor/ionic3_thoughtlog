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
  thoughtArray: any;
  thoughtArray1: any;
  page = 0;
//  thoughtData={};
thoughtData= {"description": "","status": "published", "category": "self", "tags": []}
  userPostData = {"_id": "", "token": ""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,  public app: App) {

    const data = JSON.parse(localStorage.getItem('userData'));
    console.log(data);
    this.userDetails = data;
    this.thoughtArray=[];
    this.thoughtArray1=[];
    this.userPostData._id = this.userDetails._id;
    this.userPostData.token = this.userDetails.token;
    //this.thoughtData.token = this.userDetails.token;

    this.showData(this.page);


  }
  
  ngOnInit(){
  // this.showData()
  }
showData(page){
  console.log('neelmani')
  this.page = this.page+1;
  this.authService.getThoughts(this.userDetails,this.page).then((result) => {
        this.responseData = result;
        console.log(result)
        // Hide the loader.
        //loader.dismiss();
        console.log(this.responseData);
        
        if(!this.responseData.thoughts){
          console.log('token not present')
          
        } else {
          console.log('mmmmmmm  ' + this.responseData.thoughts.length)
          for (var i = 0; i < this.responseData.thoughts.length; i++) {
                        //console.log('aaaa ' + this.responseData.thoughts[i].description)
                        this.thoughtArray.push(this.responseData.thoughts[i]);
                    }
                  //  console.log('lllll ' + this.thoughtArray1)
          //this.navCtrl.push(TabsPage);
        }
      }, (err) => {
        //loader.dismiss();
        console.log(err);
      });
    

}
  backToWelcome() {
   const root = this.app.getRootNav();
   console.log('kkk : ',root)
   root.popToRoot();
  }

  logout(){
     localStorage.clear();
     setTimeout(() => this.backToWelcome(), 1000);
  }

  saveThought(){
  console.log('aaaaaaaaaaaa');
   this.authService.saveThoughts(this.thoughtData,this.userDetails).then((result) => {
   this.responseData = result;
   console.log(this.responseData);
   }, (err) => {
        //loader.dismiss();
        console.log(err);
    });

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.showData(this.page)
      console.log('Async operation has ended');
      infiniteScroll.enable(false);
    }, 5000);
  }

}
