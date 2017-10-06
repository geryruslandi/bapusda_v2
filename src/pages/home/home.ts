import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {tokenService} from "../../services/token.service";
import {Http} from "@angular/http";
import {Headers} from "@angular/http";
import {LoadingController} from "ionic-angular";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    constructor(public navCtrl: NavController, public alertCtrl:AlertController, public http: Http,public _tokenService:tokenService,public loading: LoadingController) {

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

    login(username,password){
        let loader = this.loading.create({
            content: 'Mohon Tunggu.....',
        });

        loader.present().then(() => {
            var headers = new Headers();
            headers.append('Content-Type','application/x-www-form-urlencoded');
            this.http.post("http://localhost/crud-api/api.php?type=login",
                JSON.stringify({'username':username,'password':password}),
                {
                    headers:headers
                })
                .map(res => res.json())
                .subscribe(
                    data => {
                        this._tokenService.setToken(data.token);
                        const alert = this.alertCtrl.create({
                            title: 'Login Berhasil',
                            subTitle: 'Sekarang Anda Bisa Melakukan Pencarian Buku Menggunakan Barcode',
                            buttons: ['Dismiss']
                        });
                        alert.present();
                    },
                    err  => {
                        const alert = this.alertCtrl.create({
                            title: 'Login Failed',
                            subTitle: 'Username atau password salah',
                            buttons: ['Dismiss']
                        });
                        alert.present();
                    }
                    );

            setTimeout(()=>{ loader.dismiss() }, 1000)
        })
    }



  
}
