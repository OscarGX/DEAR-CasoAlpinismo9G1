import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'visitas',
    loadChildren: () => import('./visitas/visitas.module').then(m => m.VisitasModule)
  },
  {
    path: 'visitantes',
    loadChildren: () => import('./visitantes/visitantes.module').then(m => m.VisitantesModule)
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
