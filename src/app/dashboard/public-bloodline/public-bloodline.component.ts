import { Component, OnInit } from '@angular/core';
import { Save } from 'src/app/models/save.model';
import { BloodSaveService } from 'src/app/services/blood-save.service';
import { SelectSaveService } from 'src/app/services/select-save.service';

@Component({
  selector: 'app-public-bloodline',
  templateUrl: './public-bloodline.component.html',
  styleUrls: ['./public-bloodline.component.css']
})
export class PublicBloodlineComponent implements OnInit {
  bloodSaves: Save[][]
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

  constructor(private bloodSaveService: BloodSaveService, private selectService: SelectSaveService) { }

  ngOnInit() {
    this.bloodSaves = this.bloodSaveService.getBloodSaves()
  }

  ngDoCheck() {
    this.hideIfEmpty(0);this.hideIfEmpty(1);this.hideIfEmpty(2);this.hideIfEmpty(3)
  }

  hideIfEmpty(key: number) {
        this.mapbgStyles[key] = this.bloodSaves[key].length === 0 ? PublicBloodlineComponent.ebgS : ''
        this.mapcStyles[key] = this.bloodSaves[key].length === 0 ? PublicBloodlineComponent.ecS : ''
        this.mapcsStyles[key] = this.bloodSaves[key].length === 0 ? PublicBloodlineComponent.cS : ''
  }

  toggleCollapse(elem: number) {
    this.mapCollapse[elem] = this.bloodSaves[elem].length > 0 ? !this.mapCollapse[elem] : this.mapCollapse[elem]
  }
  setSelected(save: Save){
    this.activeSelected = save.uName
    this.selectService.setSelected(save)
  }
}