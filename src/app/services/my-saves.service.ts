import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MySavesService {
  didLogout: boolean = false

  // private mySaves: Map<string, Save[]> =
  //   new Map([
  //     ['Seeds', this.seedList],
  //     ['Worlds', this.worldList],
  //     ['Forts', this.fortList],
  //     ['Characters', this.characterList]
  //   ])



  private mySaves: Save[][] = [[],[],[],[]]

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
