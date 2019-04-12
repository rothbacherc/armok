import { Component, OnInit } from '@angular/core';
import { AllSavesService } from 'src/app/services/all-saves.service';
import { Save } from 'src/app/models/save.model';

@Component({
  selector: 'app-public-all',
  templateUrl: './public-all.component.html',
  styleUrls: ['./public-all.component.css']
})
export class PublicAllComponent implements OnInit {
  allSaves: Save[][]
  typeNames: string[] = ['Seeds', 'Worlds', 'Forts', 'Characters']
  mapCollapse: boolean[] = [true, true, true, true]
  mapbgStyles: string[] = ['','','','']
  mapcStyles: string[] = ['','','','']
  mapcsStyles: string[] = ['','','','']
  mapStates: Map<string, string> = new Map([
    ['Seeds', 'closed'], ['Worlds', 'closed'], ['Forts', 'closed'], ['Characters', 'closed']
  ])
  static ebgS = '#2c2d2e' //empty background style
  static ecS = '#4f5052' //empty color style
  static cS = 'auto' //cursor style

  constructor(private allSaveService: AllSavesService) { }

  ngOnInit() {
    this.allSaves = this.allSaveService.getAllSaves()
  }

  ngDoCheck() {
    this.hideIfEmpty(0);this.hideIfEmpty(1);this.hideIfEmpty(2);this.hideIfEmpty(3)
  }

  hideIfEmpty(key: number) {
        this.mapbgStyles[key] = this.allSaves[key].length === 0 ? PublicAllComponent.ebgS : ''
        this.mapcStyles[key] = this.allSaves[key].length === 0 ? PublicAllComponent.ecS : ''
        this.mapcsStyles[key] = this.allSaves[key].length === 0 ? PublicAllComponent.cS : ''
  }

  toggleCollapse(elem: number) {
    this.mapCollapse[elem] = this.allSaves[elem].length > 0 ? !this.mapCollapse[elem] : this.mapCollapse[elem]
  }
}
