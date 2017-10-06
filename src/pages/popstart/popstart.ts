import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-popstart',
  templateUrl: 'popstart.html'
})
export class PopstartPage {
@ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController) {

  }

  popstartPage(){
	  this.navCtrl.setRoot(TabsPage);
  }
  
  startApp() {
    this.navCtrl.setRoot(TabsPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }
  
  slideNext() {
	  this.slides.slideNext();
  }
  
}
