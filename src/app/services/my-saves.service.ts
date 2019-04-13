import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class MySavesService {


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
    return this.mySaves
  }
  addSave(save: Save){
    this.mySaves[save.type].push(save)
  }
}
