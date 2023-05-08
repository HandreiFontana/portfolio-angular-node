import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { PoPageModule, PoI18nModule } from "@po-ui/ng-components"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { DefaultComponent } from "./_layouts/default/default.component"
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { NoDataComponent } from './components/no-data/no-data.component'
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { SavedFilterComponent } from './components/filter-modal/saved-filter/saved-filter.component'
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./pages/authentication/home/home.component"
import { ProfileComponent } from './pages/authentication/profile/profile.component'
import { LoginComponent } from "./pages/authentication/login/login.component"
import { ResetPasswordComponent } from "./pages/authentication/reset-password/reset-password.component"
import { BlockReasonEditComponent } from "./pages/security/block-reason/block-reason-edit/block-reason-edit.component"
import { BlockReasonListComponent } from "./pages/security/block-reason/block-reason-list/block-reason-list.component"
import { UserGroupEditComponent } from "./pages/security/user-group/user-group-edit/user-group-edit.component"
import { UserGroupListComponent } from "./pages/security/user-group/user-group-list/user-group-list.component"
import { UserEditComponent } from "./pages/security/user/user-edit/user-edit.component"
import { UserListComponent } from "./pages/security/user/user-list/user-list.component"
import { ModuleEditComponent } from "./pages/security/module/module-edit/module-edit.component"
import { ModuleListComponent } from "./pages/security/module/module-list/module-list.component"
import { MenuOptionEditComponent } from "./pages/security/menu-option/menu-option-edit/menu-option-edit.component"
import { MenuOptionListComponent } from "./pages/security/menu-option/menu-option-list/menu-option-list.component"
import { ProfileEditComponent } from "./pages/security/profile/profile-edit/profile-edit.component"
import { ProfileListComponent } from "./pages/security/profile/profile-list/profile-list.component"
import { ProfileOptionEditComponent } from "./pages/security/profile-option/profile-option-edit/profile-option-edit.component"
import { ProfileOptionListComponent } from "./pages/security/profile-option/profile-option-list/profile-option-list.component"
import { UserProfileEditComponent } from "./pages/security/user-profile/user-profile-edit/user-profile-edit.component"
import { UserProfileListComponent } from "./pages/security/user-profile/user-profile-list/user-profile-list.component"
import { NavigationEditComponent } from "./pages/security/navigation/navigation-edit/navigation-edit.component"
import { NavigationListComponent } from "./pages/security/navigation/navigation-list/navigation-list.component"
import { CountryEditComponent } from "./pages/common/country/country-edit/country-edit.component"
import { CountryListComponent } from "./pages/common/country/country-list/country-list.component"
import { StateEditComponent } from "./pages/common/state/state-edit/state-edit.component"
import { StateListComponent } from "./pages/common/state/state-list/state-list.component"
import { CityEditComponent } from "./pages/common/city/city-edit/city-edit.component"
import { CityListComponent } from "./pages/common/city/city-list/city-list.component"
import { CustomerEditComponent } from "./pages/operation/customer/customer-edit/customer-edit.component"
import { CustomerListComponent } from "./pages/operation/customer/customer-list/customer-list.component"
import { PlaceEditComponent } from "./pages/operation/place/place-edit/place-edit.component"
import { PlaceListComponent } from "./pages/operation/place/place-list/place-list.component"
import { TokenInterceptorService } from "./services/token-interceptor.service"
import { ErrorInterceptorService } from "./services/error-interceptor.service"
import { NotAuthorizedComponent } from './pages/security/not-authorized/not-authorized.component'

import { SharedModule } from "./shared/shared.module"
import { i18nConfig } from './shared/i18n';
import { MapComponent } from './components/inputs/map/map.component'

// PO-UI
@NgModule({
  declarations: [
    AppComponent,
    CustomTableComponent,
    NoDataComponent,
    FilterModalComponent,
    SavedFilterComponent,
    LoginComponent,
    ResetPasswordComponent,
    BlockReasonEditComponent,
    BlockReasonListComponent,
    UserGroupEditComponent,
    UserGroupListComponent,
    UserEditComponent,
    UserListComponent,
    ModuleEditComponent,
    ModuleListComponent,
    MenuOptionEditComponent,
    MenuOptionListComponent,
    ProfileEditComponent,
    ProfileListComponent,
    ProfileOptionEditComponent,
    ProfileOptionListComponent,
    UserProfileEditComponent,
    UserProfileListComponent,
    NavigationEditComponent,
    NavigationListComponent,
    CountryEditComponent,
    CountryListComponent,
    StateEditComponent,
    StateListComponent,
    CityEditComponent,
    CityListComponent,
    CustomerEditComponent,
    CustomerListComponent,
    PlaceEditComponent,
    PlaceListComponent,
    DefaultComponent,
    HomeComponent,
    ProfileComponent,
    NotAuthorizedComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot([]),
    PoPageModule,
    FormsModule,
    ReactiveFormsModule,
    PoI18nModule.config(i18nConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
