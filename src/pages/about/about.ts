import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BasicPage as NavigationBasicPage } from '../../pages/navigation/basic/pages';
import { catParamServices } from '../../services/categoryparam.service';
import {tokenService} from "../../services/token.service";
import {Http} from "@angular/http";
import {NavigationDetailsPage} from "../navigation/basic/pages";
import {ModalController} from "ionic-angular";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(private barcodeScanner : BarcodeScanner, public navCtrl: NavController, public alertCtrl : AlertController,public catParam : catParamServices,public token:tokenService,public http:Http,public modalCtrl: ModalController) {

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
       //Jika Belum Login
    if(this.token.getToken() == "" || this.token.getToken() == null){
        let alert = this.alertCtrl.create({
            title: 'Unathorized',
            subTitle:'Anda harus login terlebih dahulu untuk menggunakan feature ini',
            buttons: ['Dismiss']
        });
        alert.present();
    }
    //Jika Sudah Login
    else{

        let alert = this.alertCtrl.create({
            title: 'Menunggu Scan Buku',
            inputs: [
                {
                    name: 'Barcode_Number',
                    placeholder: 'Barcode Number'
                }],
            buttons: [
                {
                    text: 'Search',
                    handler: data => {
                        //Fungsi berjalan ketik string dari barcode di terima
                        this.http.get("http://localhost/crud-api/api.php/catalogs?filter=ISBN,eq,".concat(data.Barcode_Number).concat("&transform=1"))
                            .map(res=> res.json())
                            .subscribe(data=>{
                                //JIKA TIDAK DI TEMUKAN
                                console.log(data.Bardcode_Number);
                                console.log(data.catalogs);

                                if(data.catalogs.length == 0){
                                    let alert = this.alertCtrl.create({
                                        title: 'Not Found',
                                        subTitle:'Buku tidak di temukan',
                                        buttons: ['Dismiss']
                                    });
                                    alert.present();
                                }
                                //JIKA DI TEMUKAN
                                else{
                                    //DATA HASIL PENCARIAN BERADA DI
                                    //data.catalogs[0]
                                    let modal = this.modalCtrl.create(NavigationDetailsPage, { item: data.catalogs[0],token:this.token.getToken() });
                                    modal.present();
                                }
                            })
                    }
                },
                {
                    text: 'Cancel'
                }
                ]
        });
        alert.present();
    }
}



}
