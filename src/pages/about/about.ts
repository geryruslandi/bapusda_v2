import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BasicPage as NavigationBasicPage } from '../../pages/navigation/basic/pages';
import { catParamServices } from '../../services/categoryparam.service';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(private barcodeScanner : BarcodeScanner, public navCtrl: NavController, public alertCtrl : AlertController,public catParam : catParamServices) {

  }

  listPage(param){
      this.catParam.setParam(param);
	  this.navCtrl.push(NavigationBasicPage);
  }
  
   scan(){
	this.barcodeScanner.scan().then((barcodeData) => {
    let alert = this.alertCtrl.create({
      title: 'Buku Teridentifikasi',
      subTitle: barcodeData.text,
      buttons: ['OK']
    });
    alert.present();
  }, (err) => {
		// return
	});
  }
  
  bookAlert() {
  let alert = this.alertCtrl.create({
    title: 'Menunggu Scan Buku',
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
