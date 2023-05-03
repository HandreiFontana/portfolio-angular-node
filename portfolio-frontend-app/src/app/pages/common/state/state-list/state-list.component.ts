import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "/state-list",
  templateUrl: ".//state-list.component.html",
})
export class StateListComponent implements OnInit {
  public literals: any = {}

  public initialFields = []

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.getLiterals()
  }

  getLiterals() {
    this.languagesService
      .getLiterals({ type: 'list', module: 'common', options: 'state'})
      .pipe(map(res => this.literals = res))
      .subscribe({
        next: () => this.initialFields = [
          { property: "id", key: true, visible: false },
          { property: 'federativeUnit', label: this.literals.fields.list['federativeUnit'] },
          { property: 'stateName', label: this.literals.fields.list['stateName'] }
        ]
      })
  }

}
