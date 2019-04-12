import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class MySavesService {
  seedList: Save[] = [
    new Save('Jupiter', saveTypes.seed, '', true, false, 'Komo'),
    new Save('Saturn', saveTypes.seed, '', true, false, 'Audrey'),
    new Save('Pluto', saveTypes.seed, '', true, false, 'Mirra')
  ]
  worldList: Save[] = [
    new Save('Earth', saveTypes.world, '', true, false, 'Damay'),
    new Save('Venus', saveTypes.world, '', true, false, 'Taylor'),
    new Save('Mars', saveTypes.world, '', true, false, 'Jason')
  ]
  fortList: Save[] = []
  characterList: Save[] = [
    new Save('Grog', saveTypes.character, '', true, false, 'Lunan'),
    new Save('Legolas', saveTypes.character, '', true, false, 'Cacktus'),
    new Save('Lyra', saveTypes.character, '', true, false, 'Hailey')
  ]

  // private mySaves: Map<string, Save[]> =
  //   new Map([
  //     ['Seeds', this.seedList],
  //     ['Worlds', this.worldList],
  //     ['Forts', this.fortList],
  //     ['Characters', this.characterList]
  //   ])
  private mySaves: Save[][] = [
    this.seedList, this.worldList, this.fortList, this.characterList
  ]

  constructor() { }

  getAllMySaves() {
    return this.mySaves
  }
  addSave(save: Save){
    this.mySaves[save.type].push(save)
    console.log(this.seedList)
  }
}
