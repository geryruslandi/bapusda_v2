import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PopstartPage } from '../pages/popstart/popstart';
import { catParamServices } from '../services/categoryparam.service';

@Component({
  templateUrl: 'app.html',
  providers :[catParamServices]
})
export class MyApp {
  rootPage:any = PopstartPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
