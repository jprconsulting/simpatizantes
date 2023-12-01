import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { HeaderStatsComponent } from './components/header-stats/header-stats.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardBarChartComponent } from './components/cards/card-bar-chart/card-bar-chart.component';
import { CardLineChartComponent } from './components/cards/card-line-chart/card-line-chart.component';
import { CardPageVisitsComponent } from './components/cards/card-page-visits/card-page-visits.component';
import { CardProfileComponent } from './components/cards/card-profile/card-profile.component';
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
import { NgChartsModule } from 'ng2-charts';


@NgModule({
    declarations: [
        AdminNavbarComponent,
        FooterAdminComponent,
        HeaderStatsComponent,
        SidebarComponent,
        CardBarChartComponent,
        CardLineChartComponent,
        CardPageVisitsComponent,
        CardProfileComponent,
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

    ],
    exports: [
        AdminNavbarComponent,
        FooterAdminComponent,
        HeaderStatsComponent,
        SidebarComponent,
        CardBarChartComponent,
        CardLineChartComponent,
        CardPageVisitsComponent,
        CardProfileComponent,
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
        

    ],
    imports: [
        CommonModule,
        RouterModule,
        NgChartsModule
    ]
})
export class SharedModule { }
