import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvidenciaRoutingModule } from './evidencia-routing.module';
import { EvidenciaComponent } from './evidencia.component';
import { SharedModule } from 'src/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    EvidenciaComponent
  ],
  imports: [
    CommonModule,
    EvidenciaRoutingModule,
      SharedModule,
      NgSelectModule
  ]
})
export class EvidenciaModule { }
