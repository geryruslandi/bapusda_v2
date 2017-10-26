import { Component } from '@angular/core';
import { NavController, NavParams, ModalController ,AlertController} from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { catParamServices } from '../../../services/categoryparam.service';
import {tokenService} from "../../../services/token.service";
import 'rxjs/add/operator/map';

//enggak tau kenapa , provider root untuk catparamservices dgn tokenservices gk keinstansisasi wktu manggil modal yang makai komponen navigationdetailspage,
// jadinya di akali pakai navigation parameter
@Component({
  templateUrl: 'navigation-details.html'
})
export class NavigationDetailsPage {
	item;
	token;

  constructor(private params: NavParams, public alertCtrl :AlertController,public http:Http) {
    this.item = params.data.item;
    this.token = params.data.token;
    console.log(this.item)
  }

  print(){
      //Jika Belum Login
      if(this.token == "" || this.token == null){
          let alert = this.alertCtrl.create({
              title: 'Unathorized',
              subTitle:'Anda harus login terlebih dahulu untuk menggunakan feature ini',
              buttons: ['Dismiss']
          });
          alert.present();
      }
      //Jika Sudah Login
      else{


          console.log(this.item)
          let header = new Headers();
          header.append('token',this.token)

          this.http.post("http://localhost/crud-api/api.php?type=pinjam",
              JSON.stringify({'title':this.item.Title,'book_id':this.item.ID,'token':this.token}))
              .subscribe((data:any)=>{
                console.log("status")
                console.log(data)
                if(data.status == 200){
                  console.log(data)
                  var popupWin = window.open("", "MsgWindow", "width=427,height=512");
                  popupWin.document.open();
                  popupWin.document.write(`
                                                  <html>
                                                    <body>
                                                        <script src="http://localhost/crud-api/pdf.js"></script>
                                                        <canvas id="the-canvas"></canvas>
                                                        <script>
                                                            var pdfData = atob('`+data._body+`');

                                                            // Disable workers to avoid yet another cross-origin issue (workers need
                                                            // the URL of the script to be loaded, and dynamically loading a cross-origin
                                                            // script does not work).
                                                            // PDFJS.disableWorker = true;

                                                            // The workerSrc property shall be specified.
                                                            PDFJS.workerSrc = 'http://localhost/crud-api/pdf.worker.js';

                                                            // Using DocumentInitParameters object to load binary data.
                                                            var loadingTask = PDFJS.getDocument({data: pdfData});
                                                            loadingTask.promise.then(function(pdf) {
                                                            console.log('PDF loaded');

                                                            // Fetch the first page
                                                            var pageNumber = 1;
                                                            pdf.getPage(pageNumber).then(function(page) {
                                                            console.log('Page loaded');

                                                            var scale = 1.5;
                                                            var viewport = page.getViewport(scale);

                                                            // Prepare canvas using PDF page dimensions
                                                            var canvas = document.getElementById('the-canvas');
                                                            var context = canvas.getContext('2d');
                                                            canvas.height = viewport.height;
                                                            canvas.width = viewport.width;

                                                            // Render PDF page into canvas context
                                                            var renderContext = {
                                                            canvasContext: context,
                                                            viewport: viewport
                                                            };
                                                            var renderTask = page.render(renderContext);
                                                            renderTask.then(function () {
                                                            console.log('Page rendered');

                                                            window.print();
                                                            window.close();
                                                            });
                                                            });
                                                            }, function (reason) {
                                                            // PDF loading error
                                                            console.error(reason);
                                                            });
                                                        </script>
                                                    </body>
                                                  </html>`
                  );
                  popupWin.document.close();
                }
              },(error :any)=>{
                const alert = this.alertCtrl.create({
                  title: 'Sesi Habis',
                  subTitle: 'Silahkan Login Kembali',
                  buttons: [{
                      text:'Logout',
                      handler: data=>{
                          location.reload();
                      }
                    }]
                });
                alert.present();

              })
      }
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
			<img src="http://localhost/inlislite3/uploaded_files/sampul_koleksi/original/nophoto.jpg">
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

  constructor(public nav: NavController, public http: Http, public modalCtrl: ModalController,public catParam : catParamServices,public token : tokenService) {
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
		let modal = this.modalCtrl.create(NavigationDetailsPage, { item: item, token : this.token.getToken()});
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
//this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,sw,0').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori Agama & filsafat
//this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,1,2').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori ilmu sosial & bahasa
//this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,3,4').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori ilmu pengetahuan murni & teknologi
//this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,5,6').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori seni, olahraga & kesusastraan
//this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,bt,7,8').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});

// Kategori sejarah, geografi
//this.http.get('http://localhost/crud-api/api.php/catalogs?order=id&transform=1&filter=CallNumber,sw,9').map(res => res.json()).subscribe(data => { this.items = data.catalogs;});


}
