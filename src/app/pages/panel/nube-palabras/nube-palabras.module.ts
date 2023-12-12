import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { NubePalabrasComponent } from './nube-palabras.component';
import { NubePalabrasRoutingModule } from './nube-palabras-routing.module';

@NgModule({
  declarations: [
    NubePalabrasComponent
  ],
  imports: [
    CommonModule,
    NubePalabrasRoutingModule,
    SharedModule,
    NgChartsModule

  ],
  exports: [NubePalabrasComponent]
})
export class NubePalabrasdModule { }
