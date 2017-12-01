import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartialPressurePage } from './partial-pressure';

@NgModule({
  declarations: [
    PartialPressurePage,
  ],
  imports: [
    IonicPageModule.forChild(PartialPressurePage),
  ],
})
export class PartialPressurePageModule {}
