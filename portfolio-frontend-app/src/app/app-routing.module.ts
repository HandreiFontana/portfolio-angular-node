import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { DefaultComponent } from "./_layouts/default/default.component"
import { HomeComponent } from "./pages/authentication/home/home.component"
import { ProfileComponent } from './pages/authentication/profile/profile.component'
import { LoginComponent } from "./pages/authentication/login/login.component"
import { ResetPasswordComponent } from "./pages/authentication/reset-password/reset-password.component"
import { NotAuthorizedComponent } from "./pages/security/not-authorized/not-authorized.component"
import { AuthGuard } from "./services/auth.guard"

// Componentes
const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'block-reasons',
        loadChildren: () => import('./modules/security/block-reasons/block-reasons.module').then(m => m.BlockReasonsModule),
      },
      {
        path: 'user-groups',
        loadChildren: () => import('./modules/security/user-groups/user-groups.module').then(m => m.UserGroupsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/security/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'modules',
        loadChildren: () => import('./modules/security/modules/modules.module').then(m => m.ModulesModule),
      },
      {
        path: 'menu-options',
        loadChildren: () => import('./modules/security/menu-options/menu-options.module').then(m => m.MenuOptionsModule),
      },
      {
        path: 'profiles',
        loadChildren: () => import('./modules/security/profiles/profiles.module').then(m => m.ProfilesModule),
      },
      {
        path: 'profile-options',
        loadChildren: () => import('./modules/security/profile-options/profile-options.module').then(m => m.ProfileOptionsModule),
      },
      {
        path: 'users-profiles',
        loadChildren: () => import('./modules/security/users-profile/users-profile.module').then(m => m.UsersProfileModule),
      },
      {
        path: 'navigations',
        loadChildren: () => import('./modules/security/navigations/navigations.module').then(m => m.NavigationsModule),
      },
      {
        path: 'countries',
        loadChildren: () => import('./modules/common/country/country.module').then(m => m.CountryModule),
      },
      {
        path: 'states',
        loadChildren: () => import('./modules/common/state/state.module').then(m => m.StateModule),
      },
      {
        path: 'cities',
        loadChildren: () => import('./modules/common/city/city.module').then(m => m.CityModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('./modules/operation/customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'places',
        loadChildren: () => import('./modules/operation/place/place.module').then(m => m.PlaceModule),
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "reset/:id",
    component: ResetPasswordComponent,
  },
  {
    path: "not-authorized",
    component: NotAuthorizedComponent
  },

  { path: "**", redirectTo: "/login" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
