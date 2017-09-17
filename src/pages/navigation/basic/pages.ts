import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { catParamServices } from '../../../services/categoryparam.service';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'navigation-details.html',
})
export class NavigationDetailsPage {
	item;

  constructor(params: NavParams) {
    this.item = params.data.item;
  }
}

@Component({
  template: `
<ion-split-pane>
<ion-header>
  <ion-navbar>
    <ion-searchbar (change)="_searchTitle($event.target.value)" placeholder="Cari Buku Di Kategori Ini" ></ion-searchbar>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-list>
    <button ion-item *ngFor="let item of items let idx=index" (click)="_openNavDetailsPage(item)" (item)="items[idx]" icon-start>
      			<ion-avatar item-start>
			<img src="http://localhost:8123/inlislite3/uploaded_files/sampul_koleksi/original/nophoto.jpg">
			</ion-avatar>
			<h2>{{ item.Title }}</h2>
    <h3>{{ item.Author }}</h3>
    </button>
  </ion-list>
</ion-content>

<ion-content padding>
<ion-card style="height:95%;">
<ion-slides>
  <ion-slide *ngFor="let item of items">
    <h1> {{ item.Title }}</h1>
  </ion-slide>
</ion-slides>
</ion-card>
</ion-content>
</ion-split-pane>
`
})
export class BasicPage {
    public items : any = [];
	item : any;

  constructor(public nav: NavController, public http: Http, public modalCtrl: ModalController,public catParam : catParamServices) {
   this.items = this.load();
  }
  	load(){
      switch(this.catParam.getParam()){
          case 'umum':
              this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,sw,0').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
              break;
          case 'agamafilsafat':
              this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,1,2').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
              break;
          case 'sosialbahasa':
              this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,3,4').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
              break;
          case 'sainstekno':
              this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,5,6').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
              break;
          case 'seniolahragasastra':
              this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,7,8').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
              break;
          case 'sejarahgeo':
              this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,sw,9').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
              break;
      }
   }
  	_openNavDetailsPage(item) {
		let modal = this.modalCtrl.create(NavigationDetailsPage, { item: item });
		modal.present();
	}
	_searchTitle(event){
        switch(this.catParam.getParam()){
            case 'umum':
                this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter[]=CallNumber,sw,0&filter[]=title,cs,'.concat(event)).map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
                break;
            case 'agamafilsafat':
                this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,1,2&filter[]=title,cs,'.concat(event)).map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
                break;
            case 'sosialbahasa':
                this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,3,4&filter[]=title,cs,'.concat(event)).map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
                break;
            case 'sainstekno':
                this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,5,6&filter[]=title,cs,'.concat(event)).map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
                break;
            case 'seniolahragasastra':
                this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,7,8&filter[]=title,cs,'.concat(event)).map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
                break;
            case 'sejarahgeo':
                this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,sw,9&filter[]=title,cs,'.concat(event)).map(res => res.json()).subscribe(data => { this.items = data.catalogs;});
                break;
        }
    }
 
 
// ****** LIST API READ KOLEKSI DENGAN FILTER ******** //
	
// Kategori umum 
//this.http.get('http://localhost:8123/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,sw,0').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori Agama & filsafat
//this.http.get('http://localhost:8123/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,1,2').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori ilmu sosial & bahasa
//this.http.get('http://localhost:8123/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,3,4').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori ilmu pengetahuan murni & teknologi
//this.http.get('http://localhost:8123/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,5,6').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori seni, olahraga & kesusastraan
//this.http.get('http://localhost:8123/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,7,8').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori sejarah, geografi
//this.http.get('http://localhost:8123/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,sw,9').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

 
}