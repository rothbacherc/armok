import { Component, OnInit, DoCheck } from '@angular/core';
import { MySavesService } from 'src/app/services/mysaves.service';
import { Save } from 'src/app/models/save.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, DoCheck {
  sCollapse = true
  wCollapse = true
  fCollapse = true
  cCollapse = true
  listWorlds: Save[]
  listForts: Save[]
  listChars: Save[]
  listSeeds: Save[]
  static ebgS = '#2c2d2e' //empty background style
  static ecS = '#4f5052' //empty color style
  static cS = 'auto' //cursor style
  sbgStyle: string
  scStyle: string
  scS: string
  wbgStyle: string
  wcStyle: string
  wcS: string
  fbgStyle: string
  fcStyle: string
  fcS: string
  cbgStyle: string
  ccStyle: string
  ccS: string

  constructor(private mySaveService: MySavesService) { }

  ngOnInit() {
    this.listWorlds = this.mySaveService.getMyWorldSaves()
    this.listSeeds = this.mySaveService.getMySeedSaves()
    this.listForts = this.mySaveService.getMyFortSaves()
    this.listChars = this.mySaveService.getMyCharacterSaves()
  }

  ngDoCheck(){
    if (this.listSeeds.length === 0){this.sbgStyle = PersonalComponent.ebgS; this.scStyle = PersonalComponent.ecS; this.scS = PersonalComponent.cS}
    if (this.listWorlds.length === 0){this.wbgStyle = PersonalComponent.ebgS; this.wcStyle = PersonalComponent.ecS; this.wcS = PersonalComponent.cS}
    if (this.listForts.length === 0){this.fbgStyle = PersonalComponent.ebgS; this.fcStyle = PersonalComponent.ecS; this.fcS = PersonalComponent.cS}
    if (this.listChars.length === 0){this.cbgStyle = PersonalComponent.ebgS; this.ccStyle = PersonalComponent.ecS; this.ccS = PersonalComponent.cS}
  }

  toggleCollapse(elem){
    switch(elem){
      case 's': {
        this.sCollapse = this.listSeeds.length > 0 ? !this.sCollapse : this.sCollapse
        break
      }
      case 'w' : {
        this.wCollapse = this.listWorlds.length > 0 ? !this.wCollapse : this.wCollapse
        break
      }
      case 'f': {
        this.fCollapse = this.listForts.length > 0 ? !this.fCollapse : this.fCollapse
        break
      }
      case 'c': {
        this.cCollapse = this.listChars.length > 0 ? !this.cCollapse : this.cCollapse
        break
      }
    }
  }
}
