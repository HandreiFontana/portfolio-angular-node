import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "app-customer-edit",
  templateUrl: "./customer-edit.component.html",
  styleUrls: ["./customer-edit.component.scss"],
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public stateId = ''
  public result: any
  public literals: any = {}

  customerForm = this.formBuilder.group({
    customerName: '',
    email: '',
    phone: '',
    countryId: null,
    stateId: null,
    cityId: null,
    address: '',
  })

  public readonly serviceApi = `${environment.baseUrl}/customers`
  public countryIdService = `${environment.baseUrl}/countries/select`
  public stateIdService = `${environment.baseUrl}/states/select`
  public cityIdService = `${environment.baseUrl}/cities/select`

  subscriptions = new Subscription()

  public readonly pageActions: Array<PoPageAction> = []

  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public restService: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private languagesService: LanguagesService
  ) { }

  ngOnInit(): void {
    this.getLiterals()

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.subscriptions.add(this.getCustomer(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'operation', options: 'customer'})
      .subscribe({
        next: res => this.literals = res
      })
  }

  getPageType(route: string): string {
    switch (route) {
      case 'new':
        return 'new'
      case 'new/:id':
        return 'new'
      case 'edit':
        return 'edit'
      case 'edit/:id':
        return 'edit'
      case 'view/:id':
        return 'view'
    }
  }

  pageButtonsBuilder(pageType: string): null {
    if (pageType === 'view') {
      this.readonly = true

      this.pageActions.push(
        {
          label: this.literals.return,
          action: this.goBack.bind(this),
        }
      )
      return
    }

    this.pageActions.push(
      {
        label: this.literals.save,
        action: () => this.save(this.customerForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.customerForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getCustomer(id: string) {
    this.restService
      .get(`/customers/${id}`)
      .subscribe({
        next: (result) => {
          this.stateId = result.stateId
          this.customerForm.patchValue({
            customerName: result.customerName,
            email: result.email,
            phone: result.phone,
            countryId: result.countryId,
            stateId: result.stateId,
            cityId: result.cityId,
            address: result.address,
          })
        },
        error: (error) => console.log(error)
      })
  }

  stateIdChange(event: string) {
    this.cityIdService = `${environment.baseUrl}/cities/select?stateId=${event}`
  }

  save(data, willCreateAnother?: boolean) {
    if (this.customerForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/customers/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.customerForm.reset()
                  this.router.navigate(["customers/new"])
                } else {
                  this.router.navigate(["customers"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/customers", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.customerForm.reset()
                  this.router.navigate(["customers/new"])
                } else {
                  this.router.navigate(["customers"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      }
    } else {
      this.markAsDirty()
      this.poNotification.warning({
        message: this.literals.formError,
        duration: environment.poNotificationDuration
      })
    }
  }

  markAsDirty() {
    this.customerForm.controls.customerName.markAsDirty()
    this.customerForm.controls.email.markAsDirty()
    this.customerForm.controls.phone.markAsDirty()
    this.customerForm.controls.countryId.markAsDirty()
    this.customerForm.controls.stateId.markAsDirty()
    this.customerForm.controls.cityId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["customers"])
  }
}
