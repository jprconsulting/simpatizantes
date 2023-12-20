import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from './pages/panel/panel.module';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { CardBienvenidaComponent } from '../shared/components/cards/card-bienvenida/card-bienvenida.component';
import { LoginModule } from './pages/login/login.module';
{
  }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    FormsModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
