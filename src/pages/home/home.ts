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
  page = 0;
//  thoughtData={};
thoughtData= {"description": "","status": "published", "category": "self", "tags": []}
  userPostData = {"_id": "", "token": ""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,  public app: App) {

    const data = JSON.parse(localStorage.getItem('userData'));
    console.log(data);
    this.userDetails = data;
    
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
          this.thoughtArray= this.responseData.thoughts
          console.log('llllllllllllllll')
        } else {
        this.thoughtArray= this.thoughtArray + this.responseData.thoughts
          localStorage.setItem('thoughts', this.thoughtArray);
          console.log('mmmmmmm  ' + this.thoughtArray)

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
