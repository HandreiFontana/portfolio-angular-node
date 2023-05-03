import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CityListComponent } from 'src/app/pages/common/city/city-list/city-list.component'
import { CityEditComponent } from 'src/app/pages/common/city/city-edit/city-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesCity = [
  {
    path: "",
    component: CityListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: CityEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: CityEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: CityEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: CityEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesCity)]
  ],
  exports: [RouterModule]
})

export class CityModule { }
