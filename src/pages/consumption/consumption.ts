import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-consumption',
  templateUrl: 'consumption.html',
})
export class ConsumptionPage {

  private dataForm: object = {};
  private consumption: object = {};
  private listConsumption: Array<object> = [];

  constructor(public navCtrl: NavController) {
  }

  addConsumption()
  {
    this.consumption = this.dataForm;
    console.log(this.dataForm);
  }
}
