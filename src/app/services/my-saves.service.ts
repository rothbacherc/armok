import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class MySavesService {
  seedList: Save[] = [
    new Save('Jupiter', saveTypes.seed, '', true, 'Komo'),
    new Save('Saturn', saveTypes.seed, '', true, 'Audrey'),
    new Save('Pluto', saveTypes.seed, '', true, 'Mirra')
  ]
  worldList: Save[] = [
    new Save('Earth', saveTypes.world, '', true, 'Damay'),
    new Save('Venus', saveTypes.world, '', true, 'Taylor'),
    new Save('Mars', saveTypes.world, '', true, 'Jason')
  ]
  fortList: Save[] = []
  characterList: Save[] = [
    new Save('Grog', saveTypes.character, '', true, 'Lunan'),
    new Save('Legolas', saveTypes.character, '', true, 'Cacktus'),
    new Save('Lyra', saveTypes.character, '', true, 'Hailey')
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
  addSave(saveType: string, save: Save){
    //this.seedList.push(save)
    this.mySaves[0].push(save)
    console.log(this.seedList)
  }
}
