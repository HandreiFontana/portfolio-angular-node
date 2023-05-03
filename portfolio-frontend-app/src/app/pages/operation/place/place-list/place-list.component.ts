import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/place-list",
  templateUrl: ".//place-list.component.html",
})
export class PlaceListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'operation', options: 'place'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'placeName', label: this.literals.fields.list['placeName'] },
          { property: 'customerCustomerName', label: this.literals.fields.list['customerCustomerName'] },
          { property: 'stateFederativeUnit', label: this.literals.fields.list['stateFederativeUnit'] },
          { property: 'cityCityName', label: this.literals.fields.list['cityCityName'] },
          { property: 'size', label: this.literals.fields.list['size'] }
        ]
      })
  }

}
