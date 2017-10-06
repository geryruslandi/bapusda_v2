 import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
	act: string ="Login";
	public items : any = [];

	constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		this.load();
	}

	load(){
		this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&page=1').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
   }
  
	itemTapped() {
		let alert = this.alertCtrl.create({
			title: 'Lokasi Buku',
			message: 'Ruang Baca :',
			buttons: [
			  {
				text: 'Ok',
				handler: () => {
				  console.log('Buy clicked');
				}
			  }]
			});
		alert.present();
	}
}
