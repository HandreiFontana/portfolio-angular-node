import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CustomerListComponent } from 'src/app/pages/operation/customer/customer-list/customer-list.component'
import { CustomerEditComponent } from 'src/app/pages/operation/customer/customer-edit/customer-edit.component'
import { AuthGuard } from 'src/app/services/auth.guard'

const routesCustomer = [
  {
    path: "",
    component: CustomerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new",
    component: CustomerEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new/:id",
    component: CustomerEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: CustomerEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view/:id",
    component: CustomerEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routesCustomer)]
  ],
  exports: [RouterModule]
})

export class CustomerModule { }
