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
      path: 'bienvenida',
      loadChildren: () => import('./bienvenida/bienvenida.module')
        .then(i => i.BienvenidaModule)
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
      path: 'usuarios',
      loadChildren: () => import('./usuarios/usuarios.module')
        .then(mres => mres.UsuariosModule)
    },
    {
      path: 'areas',
      loadChildren: () => import('./areas/areas.module')
        .then(mcrp => mcrp.TablesModule)
    },

    {
      path: 'beneficiario',
      loadChildren:() => import("./beneficiario/beneficiario.module")
      .then(c => c.BeneficiarioModule)
    },
    {
      path: 'programasocial',
      loadChildren:() => import("./programasocial/programasocial.module")
      .then(c => c.ProgramasocialModule)
    },
    {
      path: 'evidencias',
      loadChildren:() => import("./evidencia/evidencia.module")
      .then(c => c.EvidenciaModule)
    },
    {
      path: 'mapa-programas-sociales',
      loadChildren:() => import("./mapa-programas-sociales/mapa-programas-sociales.module")
      .then(i => i.MapaProgramasSocialesModule)
    },
    {
      path: 'nube-palabras',
      loadChildren:() => import("./nube-palabras/nube-palabras-routing.module")
      .then(i => i.NubePalabrasRoutingModule)
    }

  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
