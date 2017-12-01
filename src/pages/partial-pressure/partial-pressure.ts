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
  private dataForm: object = {};
  private lblDepth: string = "depth";
  private lblPourcent: string = "prct";
  private lblPartialpressure: string = "pp";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
      // For calcul % o2
      pourcent = 0;
      depth = this.convertDepthToAmbPres(depth);
      pourcent = this.convertPressureToPrct(this.calculPourcent(depth,partialPressure));
      this.dataForm[this.lblPourcent] = pourcent;
      //txvDetails.setText("Explications:" + "\n1. Convertir la prof. en PAB : (Prof./10)+1\n2.Trouver la pression : PP/PAB\n3.Convertir la pression en % : Pres*100");
    }else if(depth == 0 || !depth)
    {
      // For calcul depth
      pourcent = this.convertPrctToPressure(pourcent);
      depth = this.convertAmbPresToDepth(this.calculAmbPres(partialPressure,pourcent));
      this.dataForm[this.lblDepth] = depth;
      //txvDetails.setText("Explications:" + "\n1. Convertir le % en pression : %/100\n2.Trouver la PAB : PP/Pres\n3.Convertir la PAB en Prof. : (PAB-1)*10");
    }else if(partialPressure == 0 || !partialPressure)
    {
      // For calcul partial pressure
      pourcent = this.convertPrctToPressure(pourcent);
      depth = this.convertDepthToAmbPres(depth);
      partialPressure = this.calculPartialPressure(pourcent,depth);
      this.dataForm[this.lblPartialpressure] = partialPressure;
      //txvDetails.setText("Explications:" + "\n1. Convertir la prof. en PAB : (Prof./10)+1\n2. Convertir le % en pression : %/100\n3.Trouver la Pp : Pres*PAB");
    }
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
