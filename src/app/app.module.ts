import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from './pages/panel/panel.module';
import { NgChartsModule } from 'ng2-charts';
import { CardBienvenidaComponent } from '../shared/components/cards/card-bienvenida/card-bienvenida.component';
{
  }

@NgModule({
  declarations: [
    AppComponent,
    CardBienvenidaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
