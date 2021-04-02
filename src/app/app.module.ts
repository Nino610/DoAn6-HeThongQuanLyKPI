import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ManagerComponent } from './main/admin/manager/manager.component';
import { SumDataComponent } from './main/admin/sum-data/sum-data.component';
import { TargetListComponent } from './main/admin/KPI/target-list/target-list.component';
import { ProgressListComponent } from './main/admin/KPI/progress-list/progress-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UnpageComponent } from './user/unpage/unpage.component';
import { EmployeesComponent } from './main/admin/employees/employees.component';
import { AdminComponent } from './main/admin/admin.component';
import { StaffComponent } from './main/staff/staff.component';
import { AdminModule } from './main/admin/admin.module';
import { StaffModule } from './main/staff/staff.module';
const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    component: UnpageComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ManagerComponent,
    SumDataComponent,
    TargetListComponent,
    ProgressListComponent,
    LoginComponent,
    RegisterComponent,
    UnpageComponent,
    AdminComponent,
    StaffComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AdminModule,
    StaffModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
