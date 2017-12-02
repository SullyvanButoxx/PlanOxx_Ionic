import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  private static toastError: string = "toastError";
  private static toastInfo: string = "toastInfo";
  private static toastSuccess: string = "toastSuccess";
  private static toastWarning: string = "toastWarning";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // Getter
  // get toast error
  public static getToastError()
  {
    return this.toastError;
  }
  // get toast info
  public static getToastInfo()
  {
    return this.toastInfo;
  }
  // get toast success
  public static getToastSuccess()
  {
    return this.toastSuccess;
  }
  // get toast warning
  public static getToastWarning()
  {
    return this.toastWarning;
  }
}

