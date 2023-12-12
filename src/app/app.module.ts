import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from './pages/panel/panel.module';
<<<<<<< HEAD
import { NgChartsModule } from 'ng2-charts';
import { CardBienvenidaComponent } from '../shared/components/cards/card-bienvenida/card-bienvenida.component';
{
  }
=======
>>>>>>> 5016a1ce97adbf98c924a0d4643e3972a5bcaee0

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    HttpClientModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
