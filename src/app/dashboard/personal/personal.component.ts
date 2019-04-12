import { Component, OnInit, DoCheck } from '@angular/core';
import { MySavesService } from 'src/app/services/my-saves.service';
import { Save } from 'src/app/models/save.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit, DoCheck {
  mySaves: Map<string, Save[]>
  mapCollapse: Map<string, boolean> = new Map([
    ['Seeds', true], ['Worlds', true], ['Forts', true], ['Characters', true]
  ])
  mapbgStyles: Map<string, string> = new Map([
    ['Seeds', ''], ['Worlds', ''], ['Forts', ''], ['Characters', '']
  ])
  mapcStyles: Map<string, string> = new Map([
    ['Seeds', ''], ['Worlds', ''], ['Forts', ''], ['Characters', '']
  ])
  mapcsStyles: Map<string, string> = new Map([
    ['Seeds', ''], ['Worlds', ''], ['Forts', ''], ['Characters', '']
  ])
  mapStates: Map<string, string> = new Map([
    ['Seeds', 'closed'], ['Worlds', 'closed'], ['Forts', 'closed'], ['Characters', 'closed']
  ])
  static ebgS = '#2c2d2e' //empty background style
  static ecS = '#4f5052' //empty color style
  static cS = 'auto' //cursor style

  constructor(private mySaveService: MySavesService) { }

  ngOnInit() {
    this.mySaves = this.mySaveService.getAllMySaves()
  }

  ngDoCheck() {
    this.hideIfEmpty('Seeds');this.hideIfEmpty('Worlds');this.hideIfEmpty('Forts');this.hideIfEmpty('Characters')
  }

  hideIfEmpty(elem: string) {
        this.mapbgStyles.set(elem, this.mySaves.get(elem).length === 0 ? PersonalComponent.ebgS : '')
        this.mapcStyles.set(elem, this.mySaves.get(elem).length === 0 ? PersonalComponent.ecS : '')
        this.mapcsStyles.set(elem, this.mySaves.get(elem).length === 0 ? PersonalComponent.cS : '')
  }

  toggleCollapse(elem: string) {
    this.mapCollapse.set(elem, this.mySaves.get(elem).length > 0 ? !this.mapCollapse.get(elem) : this.mapCollapse.get(elem))
  }
}
