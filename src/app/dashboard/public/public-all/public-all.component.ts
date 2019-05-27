import { Component, OnInit, Input } from '@angular/core';
import { AllSavesService } from 'src/app/services/all-saves.service';
import { Save } from 'src/app/models/save.model';
import { SelectSaveService } from 'src/app/services/select-save.service';

@Component({
  selector: 'app-public-all',
  templateUrl: './public-all.component.html',
  styleUrls: ['./public-all.component.css']
})
export class PublicAllComponent implements OnInit {
  @Input() saveType: number
  allSaves: Save[][]
  saveList: Save[]
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
  activeSelected: string = ''

  constructor(private allSaveService: AllSavesService, private selectService: SelectSaveService) { }

  ngOnInit() {
    this.allSaves = this.allSaveService.getAllSaves()
  }

  ngDoCheck() {
    this.hideIfEmpty(0);this.hideIfEmpty(1);this.hideIfEmpty(2);this.hideIfEmpty(3)
    this.saveList = this.allSaves[this.saveType]
  }

  hideIfEmpty(key: number) {
        this.mapbgStyles[key] = this.allSaves[key].length === 0 ? PublicAllComponent.ebgS : ''
        this.mapcStyles[key] = this.allSaves[key].length === 0 ? PublicAllComponent.ecS : ''
        this.mapcsStyles[key] = this.allSaves[key].length === 0 ? PublicAllComponent.cS : ''
  }

  toggleCollapse(elem: number) {
    this.mapCollapse[elem] = this.allSaves[elem].length > 0 ? !this.mapCollapse[elem] : this.mapCollapse[elem]
  }
  setSelected(save: Save){
    this.activeSelected = save.uName
    this.selectService.setSelected(save)
  }
}
