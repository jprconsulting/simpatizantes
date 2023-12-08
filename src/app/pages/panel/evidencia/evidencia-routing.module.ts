import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvidenciaComponent } from './evidencia.component';

const routes: Routes = [
  {
    path: '',
    component: EvidenciaComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvidenciaRoutingModule { }
