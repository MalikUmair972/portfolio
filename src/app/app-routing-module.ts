import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  routes: Routes = [
    {
      path: '',
      component: Home
    },
    {
      path: '**',
      redirectTo: ''
    }
  ]
}
