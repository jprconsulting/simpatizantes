import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapabenComponent } from './mapaben.component';

const routes: Routes = [
  {
    path: '',
    component: MapabenComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapabenRoutingModule { }
