import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { StateListComponent } from 'src/app/pages/common/state/state-list/state-list.component'
import { StateEditComponent } from 'src/app/pages/common/state/state-edit/state-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesState = [
  {
    path: "",
    component: StateListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: StateEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: StateEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: StateEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: StateEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesState)]
  ],
  exports: [RouterModule]
})

export class StateModule { }
