import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MySavesService {
  didLogout: boolean = false

  seedList: Save[] = [
    new Save('Russia', saveTypes.seed, '', false, true, 'Laura'),
    new Save('Oxford', saveTypes.seed, '', false, false, 'Toasty'),
    new Save('Libya', saveTypes.seed, '', false, true, 'Zach')
  ]
  worldList: Save[] = [
    new Save('Celestia', saveTypes.world, '', false, false, 'Sparrow'),
    new Save('Illidan', saveTypes.world, '', false, false, 'Megan'),
    new Save('Krogan', saveTypes.world, '', false, true, 'Maggie')
  ]
  fortList: Save[] = [
    new Save('Damali', saveTypes.world, '', false, true, 'Justin'),
    new Save('Black', saveTypes.world, '', false, true, 'Kyle'),
    new Save('Redwall', saveTypes.world, '', false, false, 'Amil')
  ]
  characterList: Save[] = [
    new Save('Sten', saveTypes.character, '', false, false, 'Gabby'),
    new Save('Cael', saveTypes.character, '', false, true, 'Jenna'),
    new Save('Aella', saveTypes.character, '', false, false, 'Elizabeth')
  ]

  private mySaves: Save[][] = [this.seedList,[],[],[]]

  constructor() { }

  getAllMySaves() {
    this.didLogout = false
    return this.mySaves
  }
  addSave(save: Save){
    this.mySaves[save.type].push(save)
  }
  logoutSaves(){
    this.mySaves = [[],[],[],[]]
  }
}
