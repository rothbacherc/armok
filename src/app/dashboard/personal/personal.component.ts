import { Component, OnInit, DoCheck } from '@angular/core';
import { MySavesService } from 'src/app/services/my-saves.service';
import { Save } from 'src/app/models/save.model';

/*I had a big oopsie from the start where I tried to use a Map<string, Save[]>
to hold the save lists, I don't know why. Save[][] is a lot easier and actually
required to make the savelists expandable.  There might be artifacts of that 
initial workaround if there are remaining maps in the personal/public components*/ 

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit, DoCheck {
  mySaves: Save[][]
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

  constructor(private mySaveService: MySavesService) { }

  ngOnInit() {
    this.mySaves = this.mySaveService.getAllMySaves()
  }

  ngDoCheck() {
    this.hideIfEmpty(0);this.hideIfEmpty(1);this.hideIfEmpty(2);this.hideIfEmpty(3)
  }

  hideIfEmpty(key: number) {
        this.mapbgStyles[key] = this.mySaves[key].length === 0 ? PersonalComponent.ebgS : ''
        this.mapcStyles[key] = this.mySaves[key].length === 0 ? PersonalComponent.ecS : ''
        this.mapcsStyles[key] = this.mySaves[key].length === 0 ? PersonalComponent.cS : ''
  }

  toggleCollapse(elem: number) {
    this.mapCollapse[elem] = this.mySaves[elem].length > 0 ? !this.mapCollapse[elem] : this.mapCollapse[elem]
  }
}
