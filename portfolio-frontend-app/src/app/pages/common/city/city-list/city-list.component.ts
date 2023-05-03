import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/city-list",
  templateUrl: ".//city-list.component.html",
})
export class CityListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'common', options: 'city'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'stateFederativeUnit', label: this.literals.fields.list['stateFederativeUnit'] },
          { property: 'cityName', label: this.literals.fields.list['cityName'] }
        ]
      })
  }

}
