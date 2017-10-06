import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	 member_status: string = "ys_member";
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }
    ionViewWillEnter(){
	  console.log('GG');
   }
  
loginAlert() {
  let alert = this.alertCtrl.create({
    title: 'Menunggu Scan Kartu',
	inputs: [
      {
        name: 'Barcode Number',
        placeholder: 'Barcode Number'
      }],
    buttons: ['Dismiss']
  });
  alert.present();
}
  
}
