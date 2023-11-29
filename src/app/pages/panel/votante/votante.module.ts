import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotanteRoutingModule } from './votante-routing.module';
import { VotanteComponent } from '../votante/votante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VotanteComponent
  ],
  imports: [
    CommonModule,
    VotanteRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class VotanteModule { }
