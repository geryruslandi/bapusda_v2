import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  member_status: string = "ys_member";
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public http :Http) {

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

    tamuguest(nama,profesi,pendidikan,kelamin,alamat,ruang,tujuan){
      var jsondata = {"Nama":nama,"Profesi_id":profesi,"PendidikanTerakhir_id":pendidikan,"JenisKelamin_id":kelamin,"Alamat":alamat, "Location_Id":ruang,"TujuanKunjungan_Id":tujuan};
      this.http.post("http://localhost/crud-api/api.php/memberguesses",JSON.stringify(jsondata))
          .map(res=>res)
          .subscribe(
              data=>{
                  const alert = this.alertCtrl.create({
                      title: 'Success',
                      subTitle: "Selamat datang ".concat(nama),
                      buttons: ['Dismiss']
                  });
                  alert.present();
              },
              err=>{
                  const alert = this.alertCtrl.create({
                      title: 'Failed',
                      subTitle: 'Error',
                      buttons: ['Dismiss']
                  });
                  alert.present();
              }
          )
    }
  
}
