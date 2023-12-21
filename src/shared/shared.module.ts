import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { HeaderStatsComponent } from './components/header-stats/header-stats.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardBarChartComponent } from './components/cards/card-bar-chart/card-bar-chart.component';
import { CardSettingsComponent } from './components/cards/card-settings/card-settings.component';
import { CardSocialTrafficComponent } from './components/cards/card-social-traffic/card-social-traffic.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats.component';
import { CardTableComponent } from './components/cards/card-table/card-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IndexDropdownComponent } from './components/dropdowns/index-dropdown/index-dropdown.component';
import { NotificationDropdownComponent } from './components/dropdowns/notification-dropdown/notification-dropdown.component';
import { PagesDropdownComponent } from './components/dropdowns/pages-dropdown/pages-dropdown.component';
import { TableDropdownComponent } from './components/dropdowns/table-dropdown/table-dropdown.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { ModalComponent } from './components/modal/modal.component';
import { CardLineBeneficiariosComponent } from './components/cards/card-line-beneficiarios/card-line-beneficiarios.component';
import { NgChartsModule } from 'ng2-charts';
import { CardBarPrograsmasocialComponent } from './components/cards/card-bar-prograsmasocial/card-bar-prograsmasocial.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { CardBarEvidenciaComponent } from './components/cards/card-bar-evidencia/card-bar-evidencia.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CardBarMapaComponent } from './components/cards/card-bar-mapa/card-bar-mapa.component';
import { MapabenComponent } from 'src/app/pages/panel/mapaben/mapaben.component';

@NgModule({
    declarations: [
        AdminNavbarComponent,
        FooterAdminComponent,
        HeaderStatsComponent,
        SidebarComponent,
        CardBarChartComponent,
        CardSettingsComponent,
        CardSocialTrafficComponent,
        CardStatsComponent,
        CardTableComponent,
        NotFoundComponent,
        IndexDropdownComponent,
        NotificationDropdownComponent,
        PagesDropdownComponent,
        TableDropdownComponent,
        UserDropdownComponent,
        ModalComponent,
        CardBarPrograsmasocialComponent,
        CardLineBeneficiariosComponent,
        CardBarEvidenciaComponent,
        CardBarMapaComponent,
        MapabenComponent





    ],
    exports: [
        AdminNavbarComponent,
        FooterAdminComponent,
        HeaderStatsComponent,
        SidebarComponent,
        CardBarChartComponent,
        CardSettingsComponent,
        CardSocialTrafficComponent,
        CardStatsComponent,
        CardTableComponent,
        CardBarPrograsmasocialComponent,
        NotFoundComponent,
        IndexDropdownComponent,
        NotificationDropdownComponent,
        PagesDropdownComponent,
        TableDropdownComponent,
        UserDropdownComponent,
        ReactiveFormsModule,
        ColorPickerModule,
        CardBarEvidenciaComponent,
        CardBarMapaComponent,
        MapabenComponent


    ],
    imports: [
        CommonModule,
        RouterModule,
        NgChartsModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgSelectModule,

    ]
})
export class SharedModule { }
