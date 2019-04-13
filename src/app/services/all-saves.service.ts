import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class AllSavesService {

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

  private allSaves: Save[][] = [
    this.seedList, this.worldList, this.fortList, this.characterList
  ]

  constructor() { }

  getAllSaves() {
    return this.allSaves
  }

  addSave(save: Save){
    this.allSaves[save.type].push(save)
  }
}
