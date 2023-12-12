import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardStatsComponent } from './card-stats.component';



@NgModule({
  declarations: [
    CardStatsComponent,
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ]
})
export class CardStatsModule { }
