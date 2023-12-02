import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiarioRoutingModule } from './beneficiario-routing.module';
import { BeneficiarioComponent } from './beneficiario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
    declarations: [
        BeneficiarioComponent
    ],
    imports: [
        CommonModule,
        BeneficiarioRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class BeneficiarioModule { }
