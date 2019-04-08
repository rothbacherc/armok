import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class MySavesService {

  private mySaves: Map<string, Save[]> =
    new Map([
      ['Seeds', [
        new Save('Jupiter', saveTypes.seed, '', true, 'Komo'),
        new Save('Saturn', saveTypes.seed, '', true, 'Audrey'),
        new Save('Pluto', saveTypes.seed, '', true, 'Mirra')
      ]],
      ['Worlds', [
        new Save('Earth', saveTypes.world, '', true, 'Damay'),
        new Save('Venus', saveTypes.world, '', true, 'Taylor'),
        new Save('Mars', saveTypes.world, '', true, 'Jason')
      ]],
      ['Forts', []],
      ['Characters', [
        new Save('Grog', saveTypes.character, '', true, 'Lunan'),
        new Save('Legolas', saveTypes.character, '', true, 'Cacktus'),
        new Save('Lyra', saveTypes.character, '', true, 'Hailey')
      ]]
    ])

  constructor() { }

  getAllMySaves() {
    return this.mySaves
  }
}
