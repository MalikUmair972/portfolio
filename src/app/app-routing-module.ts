import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { PortfolioDetail } from './pages/portfolio-detail/portfolio-detail';
import { PortfolioPage } from './pages/portfolio-page/portfolio-page';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  { path: 'portfolio', component: PortfolioPage },
  { path: 'portfolio/:id', component: PortfolioDetail },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
