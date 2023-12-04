import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramasocialRoutingModule } from './programasocial-routing.module';
import { ProgramasocialComponent } from './programasocial.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    ProgramasocialComponent
  ],
  imports: [
    CommonModule,
    ProgramasocialRoutingModule,        
    SharedModule

  ]
})
export class ProgramasocialModule { }
