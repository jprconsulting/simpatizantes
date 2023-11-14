import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from 'src/shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'panel',
    loadChildren: () => import('./pages/panel/panel.module')
      .then(p => p.PanelModule)
  },
  {
    path: '**', component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
