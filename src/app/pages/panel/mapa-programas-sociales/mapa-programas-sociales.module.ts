import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaProgramasSocialesRoutingModule } from './mapa-programas-sociales-routing.module';
import { MapaProgramasSocialesComponent } from './mapa-programas-sociales.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    MapaProgramasSocialesComponent
  ],
  imports: [
    CommonModule,
    MapaProgramasSocialesRoutingModule,
    HighchartsChartModule
  ],
  exports: [MapaProgramasSocialesComponent]
})
export class MapaProgramasSocialesModule { }
