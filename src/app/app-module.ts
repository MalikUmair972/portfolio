import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule }   from './app-routing-module';
import { App }                from './app';
import { Header }             from './components/header/header';
import { Hero }               from './components/hero/hero';
import { Footer }             from './components/footer/footer';
import { Nav }                from './components/nav/nav';
import { ThreeBackground }    from './components/three-background/three-background';
import { ScrollTransition }   from './components/scroll-transition/scroll-transition';
import { Services }           from './components/services/services';
import { Portfolio }          from './components/portfolio/portfolio';
import { Home }               from './pages/home/home';
import { Contact }            from './pages/contact/contact';
import { PortfolioDetail }    from './pages/portfolio-detail/portfolio-detail';
import { PortfolioPage }      from './pages/portfolio-page/portfolio-page';

@NgModule({
  declarations: [
    App,
    Header,
    Hero,
    Footer,
    Nav,
    ThreeBackground,
    ScrollTransition,
    Services,
    Portfolio,
    Home,
    Contact,
    PortfolioDetail,
    PortfolioPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
  ],
  bootstrap: [App],
})
export class AppModule {}
