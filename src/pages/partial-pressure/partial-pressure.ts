import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  private dataForm = {};
  private static lblDepth = "depth";
  private static lblPourcent = "prct";
  private static lblPartialpressure = "pp";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartialPressurePage');
  }
  // Calcul empty
  calculEmpty()
  {
    var depth = this.dataForm[PartialPressurePage.lblDepth];
    var pourcent = this.dataForm[PartialPressurePage.lblPourcent];
    var partialPressure = this.dataForm[PartialPressurePage.lblPartialpressure];

    if(pourcent == 0 || pourcent == null)
    {
      pourcent = 0;
      depth = this.convertDepthToAmbPres(depth);
      pourcent = this.convertPressureToPrct(this.calculPourcent(depth,partialPressure));
      console.log(pourcent);
      //txvDetails.setText("Explications:" + "\n1. Convertir la prof. en PAB : (Prof./10)+1\n2.Trouver la pression : PP/PAB\n3.Convertir la pression en % : Pres*100");
    }
  }

  // Calcul Ambient pressure
  calculAmbPres(pp, prct)
  {
    var result = 0;
    if(pp > 0 && prct > 0)
    {
      result = pp/prct;
    }
    return result;
  }
  // Calcul Partial pressure
  calculPartialPressure(prct, depth)
  {
    var result = 0;
    if(prct > 0 && depth > 0)
    {
      prct*depth;
    }
    return result;
  }
  // Calcul Pourcent
  calculPourcent(depth, pp)
  {
    var result = 0;
    if(depth > 0 && pp > 0)
    {
      result = pp/depth;
    }
    return result;
  }
  // Convert pourcent to pressure
  convertPrctToPressure(prct)
  {
    var result = 0;
    if(prct >= 1)
    {
      result = prct/100;
    }
    return result;
  }
  // Convert pressure to pourcent
  convertPressureToPrct(pressure)
  {
    var result = 0;
    if(pressure <= 1)
    {
      result = pressure*100;
    }
    return result
  }
  // Convert Depth to Ambient pressure
  convertDepthToAmbPres(depth)
  {
    var result = 0;
    if(depth >= 1)
    {
      result = (depth/10)+1;
    }
    return result;
  }
  // Convert Ambient pressure to Depth
  convertAmbPresToDepth(AmbPres)
  {
    var result = 0;
    if(AmbPres > 1)
    {
      result = (AmbPres-1)*10;
    }
    return result;
  }
}
