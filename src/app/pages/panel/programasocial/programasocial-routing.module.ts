import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramasocialComponent } from './programasocial.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramasocialComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramasocialRoutingModule { }
