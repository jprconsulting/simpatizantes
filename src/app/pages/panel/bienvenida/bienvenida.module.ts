import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaRoutingModule } from './bienvenida-routing.module';
import { BienvenidaComponent } from './bienvenida.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
    declarations: [
        BienvenidaComponent
    ],
    imports: [
        CommonModule,
        BienvenidaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class BienvenidaModule { }
