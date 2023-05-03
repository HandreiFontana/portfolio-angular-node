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
  selector: "app-place-edit",
  templateUrl: "./place-edit.component.html",
  styleUrls: ["./place-edit.component.scss"],
})
export class PlaceEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public stateId = ''
  public result: any
  public literals: any = {}

  placeForm = this.formBuilder.group({
    placeName: '',
    customerId: null,
    stateId: null,
    cityId: null,
    size: '',
    address: '',
  })

  public readonly serviceApi = `${environment.baseUrl}/places`
  public customerIdService = `${environment.baseUrl}/customers/select`
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
      this.subscriptions.add(this.getPlace(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'operation', options: 'place'})
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
        action: () => this.save(this.placeForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.placeForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getPlace(id: string) {
    this.restService
      .get(`/places/${id}`)
      .subscribe({
        next: (result) => {
          this.stateId = result.stateId
          this.placeForm.patchValue({
            placeName: result.placeName,
            customerId: result.customerId,
            stateId: result.stateId,
            cityId: result.cityId,
            size: result.size,
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
    if (this.placeForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/places/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.placeForm.reset()
                  this.router.navigate(["places/new"])
                } else {
                  this.router.navigate(["places"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/places", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.placeForm.reset()
                  this.router.navigate(["places/new"])
                } else {
                  this.router.navigate(["places"])
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
    this.placeForm.controls.placeName.markAsDirty()
    this.placeForm.controls.customerId.markAsDirty()
    this.placeForm.controls.stateId.markAsDirty()
    this.placeForm.controls.cityId.markAsDirty()
    this.placeForm.controls.size.markAsDirty()
  }

  goBack() {
    this.router.navigate(["places"])
  }
}
