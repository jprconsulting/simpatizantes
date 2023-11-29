import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';

const routes: Routes = [{
  path: '',
  component: PanelComponent,
  children: [
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(i => i.DashboardModule)
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(mrec => mrec.MapsModule)
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module')
        .then(mres => mres.SettingsModule)
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(mcrp => mcrp.TablesModule)
    },
    
    {
      path: 'Votantes',
      loadChildren:() => import("./votante/votante.module")
      .then(c => c.VotanteModule)
    },

  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
