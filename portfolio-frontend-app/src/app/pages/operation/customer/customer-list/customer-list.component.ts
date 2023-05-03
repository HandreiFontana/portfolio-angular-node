import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/customer-list",
  templateUrl: ".//customer-list.component.html",
})
export class CustomerListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'operation', options: 'customer'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'customerName', label: this.literals.fields.list['customerName'] },
          { property: 'email', label: this.literals.fields.list['email'] },
          { property: 'countryCountryName', label: this.literals.fields.list['countryCountryName'] },
          { property: 'stateFederativeUnit', label: this.literals.fields.list['stateFederativeUnit'] },
          { property: 'cityCityName', label: this.literals.fields.list['cityCityName'] },
        ]
      })
  }

}
