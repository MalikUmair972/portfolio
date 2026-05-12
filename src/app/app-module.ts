import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Footer } from './components/footer/footer';
import { ThreeBackground } from './components/three-background/three-background';
import { Home } from './pages/home/home';
import { ScrollTransition } from './components/scroll-transition/scroll-transition';

@NgModule({
  declarations: [
    App,
    Header,
    Hero,
    Footer,
    ThreeBackground,
    Home,
    ScrollTransition
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
