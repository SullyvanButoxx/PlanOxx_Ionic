import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the PartialPressurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partial-pressure',
  templateUrl: 'partial-pressure.html',
})
export class PartialPressurePage {
  //Global
  private dataForm: object = {};
  private lblDepth: string = "depth";
  private lblPourcent: string = "prct";
  private lblPartialpressure: string = "pp";
  private lastCalcul: number = 0;
  private detailCalcul: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    
  }
  // ---------------------------------------------------------------------------------------------
  // EVENTS
  // ---------------------------------------------------------------------------------------------
  // Calcul empty
  calculEmpty()
  {
    var depth: number = this.dataForm[this.lblDepth];
    var pourcent: number = this.dataForm[this.lblPourcent];
    var partialPressure: number = this.dataForm[this.lblPartialpressure];

    if(pourcent == 0 || !pourcent)
    {
      console.log(depth);
      if(depth != 0 && depth && partialPressure != 0 && partialPressure)
      {
        // For calcul % o2
        pourcent = 0;
        depth = this.convertDepthToAmbPres(depth);
        pourcent = this.convertPressureToPrct(this.calculPourcent(depth,partialPressure));
        this.dataForm[this.lblPourcent] = pourcent;
        this.lastCalcul = 1;
        this.detailCalcul = "1. Convertir la prof. en PAB :\n(Prof./10)+1\n2.Trouver la pression :\nPP/PAB\n3.Convertir la pression en % :\Pres*100";
      }else
      {
        this.showToast("La profondeur et la PPO2 doivent être complétées", 5000, MyApp.getToastError());
      }
    }else if(depth == 0 || !depth)
    {
      if(pourcent != 0 && pourcent && partialPressure != 0 && partialPressure)
      {
        // For calcul depth
        pourcent = this.convertPrctToPressure(pourcent);
        depth = this.convertAmbPresToDepth(this.calculAmbPres(partialPressure,pourcent));
        this.dataForm[this.lblDepth] = depth;
        this.lastCalcul = 2
        this.detailCalcul = "1. Convertir le % en pression :\n%/100\n2.Trouver la PAB :\nPP/Pres\n3.Convertir la PAB en Prof. :\n(PAB-1)*10";
      }else
      {
        this.showToast("Le pourcentage d'O2 et la PPO2 doivent être complétées", 5000, MyApp.getToastError());
      }
    }else if(partialPressure == 0 || !partialPressure)
    {
      if(pourcent != 0 && pourcent && depth != 0 && depth)
      {
        // For calcul partial pressure
        pourcent = this.convertPrctToPressure(pourcent);
        depth = this.convertDepthToAmbPres(depth);
        partialPressure = this.calculPartialPressure(pourcent,depth);
        this.dataForm[this.lblPartialpressure] = partialPressure;
        this.lastCalcul = 3
        this.detailCalcul = "1. Convertir la prof. en PAB :\n(Prof./10)+1\n2. Convertir le % en pression :\n%/100\n3.Trouver la Pp :\nPres*PAB";
      }else
      {
        this.showToast("Le pourcentage d'O2 et la profondeur doivent être complétées", 5000, MyApp.getToastError());
      }
    }
  }
  // Reset all
  resetAll()
  {
    this.lastCalcul = 0;
    this.dataForm[this.lblDepth] = null;
    this.dataForm[this.lblPartialpressure] = null;
    this.dataForm[this.lblPourcent] = null;
    this.detailCalcul = null;
  }
  // Reset calcul
  resetCalcul()
  {
    switch(this.lastCalcul)
    {
      case 1:
        this.dataForm[this.lblPourcent] =null;
        break;
      case 2:
        this.dataForm[this.lblDepth] = null;
        break;
      case 3:
        this.dataForm[this.lblPartialpressure] = null;
        break;
      default:
        this.resetAll();
    }
  }
  showToast(msg: string, dur: number, type: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: dur,
      cssClass: type
    });
    toast.present();
  }
  // ---------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  // FUNCTIONS
  // ---------------------------------------------------------------------------------------------
  // Calcul Ambient pressure
  calculAmbPres(pp: number, prct: number)
  {
    var result: number = 0;
    if(pp > 0 && prct > 0)
    {
      result = pp/prct;
    }
    return result;
  }
  // Calcul Partial pressure
  calculPartialPressure(prct:  number, depth: number)
  {
    var result: number = 0;
    if(prct > 0 && depth > 0)
    {
      result = prct*depth;
    }
    return result;
  }
  // Calcul Pourcent
  calculPourcent(depth: number, pp: number)
  {
    var result: number = 0;
    if(depth > 0 && pp > 0)
    {
      result = pp/depth;
    }
    return result;
  }
  // Convert pourcent to pressure
  convertPrctToPressure(prct: number)
  {
    var result: number = 0;
    if(prct >= 1)
    {
      result = prct/100;
    }
    return result;
  }
  // Convert pressure to pourcent
  convertPressureToPrct(pressure: number)
  {
    var result: number = 0;
    if(pressure <= 1)
    {
      result = pressure*100;
    }
    return result
  }
  // Convert Depth to Ambient pressure
  convertDepthToAmbPres(depth: number)
  {
    var result: number = 0;
    if(depth >= 1)
    {
      result = (depth/10)+1;
    }
    return result;
  }
  // Convert Ambient pressure to Depth
  convertAmbPresToDepth(AmbPres: number)
  {
    var result: number = 0;
    if(AmbPres > 1)
    {
      result = (AmbPres-1)*10;
    }
    return result;
  }
  // ---------------------------------------------------------------------------------------------
}
