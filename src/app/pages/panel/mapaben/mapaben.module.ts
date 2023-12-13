import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapabenRoutingModule } from './mapaben-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapabenRoutingModule,
    SharedModule,

  ]
})
export class MapabenModule { }
