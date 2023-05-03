import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PlaceListComponent } from 'src/app/pages/operation/place/place-list/place-list.component'
import { PlaceEditComponent } from 'src/app/pages/operation/place/place-edit/place-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesPlace = [
  {
    path: "",
    component: PlaceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: PlaceEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: PlaceEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: PlaceEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: PlaceEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesPlace)]
  ],
  exports: [RouterModule]
})

export class PlaceModule { }
