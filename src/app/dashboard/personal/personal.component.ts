import { Component, OnInit, DoCheck, OnChanges, OnDestroy } from '@angular/core';
import { MySavesService } from 'src/app/services/my-saves.service';
import { Save } from 'src/app/models/save.model';
import { SelectSaveService } from 'src/app/services/select-save.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

/*I had a big oopsie from the start where I tried to use a Map<string, Save[]>
to hold the save lists, I don't know why. Save[][] is a lot easier and actually
required to make the savelists expandable.  There might be artifacts of that 
initial workaround if there are remaining maps in the personal/public components*/

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit, DoCheck, OnDestroy {
  mySaves: Save[][]
  saveList: Save[]
  showThings: boolean = false
  currentType: string
  typeNames: string[] = ['Seeds', 'Worlds', 'Forts', 'Characters']
  mapCollapse: boolean[] = [true, true, true, true]
  mapcsStyles: string[] = ['', '', '', '']
  mapStates: Map<string, string> = new Map([
    ['Seeds', 'closed'], ['Worlds', 'closed'], ['Forts', 'closed'], ['Characters', 'closed']
  ])
  static cS = 'context-menu' //cursor style
  activeSelected: string = ''
  sub: Subscription

  constructor(private mySaveService: MySavesService, private selectService: SelectSaveService,
    private loginService: LoginService) {
    this.sub = loginService.logoutCall$.subscribe(
      () => {
        this.mySaves = [[], [], [], []]
      }
    )
  }

  ngOnInit() {
    this.mySaves = this.mySaveService.getAllMySaves()
    this.saveList
  }

  ngDoCheck() {
    this.hideIfEmpty(0); this.hideIfEmpty(1); this.hideIfEmpty(2); this.hideIfEmpty(3)
  }

  setSaveList(index: number) {
    if (this.mySaves[index].length > 0) {
      this.showThings = true
      this.currentType = this.typeNames[index]
      console.log(this.currentType)
      this.saveList = this.mySaves[index]
    }
  }

  hideIfEmpty(key: number) {
    this.mapcsStyles[key] = this.mySaves[key].length === 0 ? PersonalComponent.cS : ''
  }

  toggleCollapse(elem: number) {
    this.mapCollapse[elem] = this.mySaves[elem].length > 0 ? !this.mapCollapse[elem] : this.mapCollapse[elem]
  }

  setSelected(save: Save) {
    this.activeSelected = save.uName
    this.selectService.setSelected(save)
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
