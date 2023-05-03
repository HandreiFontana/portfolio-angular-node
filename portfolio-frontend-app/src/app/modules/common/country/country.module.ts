import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CountryListComponent } from 'src/app/pages/common/country/country-list/country-list.component'
import { CountryEditComponent } from 'src/app/pages/common/country/country-edit/country-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesCountry = [
  {
    path: "",
    component: CountryListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: CountryEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: CountryEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: CountryEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: CountryEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesCountry)]
  ],
  exports: [RouterModule]
})

export class CountryModule { }
