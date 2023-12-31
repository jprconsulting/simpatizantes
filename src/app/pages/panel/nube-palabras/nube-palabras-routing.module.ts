import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NubePalabrasComponent } from './nube-palabras.component';

const routes: Routes = [
  {
    path: '',
    component: NubePalabrasComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NubePalabrasRoutingModule { }
