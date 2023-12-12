import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { NubePalabrasComponent } from './nube-palabras/nube-palabras.component';


@NgModule({
  declarations: [
    PanelComponent,
    NubePalabrasComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    SharedModule,
    HttpClientModule,
    NgChartsModule    
  ],
  exports: [PanelComponent]
})
export class PanelModule { }
