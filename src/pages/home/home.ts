import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PartialPressurePage } from '../partial-pressure/partial-pressure';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openPagePartialPressure()
  {
    this.navCtrl.push(PartialPressurePage);
  }

}
