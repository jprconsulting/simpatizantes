import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiarioRoutingModule } from './beneficiario-routing.module';
import { BeneficiarioComponent } from './beneficiario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BeneficiarioComponent
  ],
  imports: [
    CommonModule,
    BeneficiarioRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class BeneficiarioModule { }
