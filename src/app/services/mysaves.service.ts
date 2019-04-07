import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class MySavesService {

  private myWorldSaves: Save[] = [
    new Save('Earth', saveTypes.world, '', true, 'Damay'),
    new Save('Venus', saveTypes.world, '', true, 'Taylor'),
    new Save('Mars', saveTypes.world, '', true, 'Jason')
  ]

  private mySeedSaves: Save[] = [
    new Save('Jupiter', saveTypes.seed, '', true, 'Komo'),
    new Save('Saturn', saveTypes.seed, '', true, 'Audrey'),
    new Save('Pluto', saveTypes.seed, '', true, 'Mirra')
  ]

  private myFortSaves: Save[] = []

  private myCharacterSaves: Save[] = [
    new Save('Grog', saveTypes.character, '', true, 'Lunan'),
    new Save('Legolas', saveTypes.character, '', true, 'Cacktus'),
    new Save('Lyra', saveTypes.character, '', true, 'Hailey')
  ]

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

  /*private mySaves: { [index: string]: { array: Save[] } } = {
    ['Seeds']: {
      array: [
        new Save('Jupiter', saveTypes.seed, '', true, 'Komo'),
        new Save('Saturn', saveTypes.seed, '', true, 'Audrey'),
        new Save('Pluto', saveTypes.seed, '', true, 'Mirra')
      ]
    },
    ['Worlds']: {
      array: [
        new Save('Earth', saveTypes.world, '', true, 'Damay'),
        new Save('Venus', saveTypes.world, '', true, 'Taylor'),
        new Save('Mars', saveTypes.world, '', true, 'Jason')
      ]
    },
    ['Forts']: {
      array: [

      ]
    },
    ['Characters']: {
      array: [
        new Save('Grog', saveTypes.character, '', true, 'Lunan'),
        new Save('Legolas', saveTypes.character, '', true, 'Cacktus'),
        new Save('Lyra', saveTypes.character, '', true, 'Hailey')
      ]
    }
  }*/

  constructor() { }

  getAllMySaves() {
    return this.mySaves
  }

  getMySaves(type: saveTypes) {
    switch (type) {
      case saveTypes.world: {
        return this.myWorldSaves.slice()
      }
      case saveTypes.fort: {
        return this.myFortSaves.slice()
      }
      case saveTypes.seed: {
        return this.mySeedSaves.slice()
      }
      case saveTypes.character: {
        return this.myCharacterSaves.slice()
      }
    }
  }
}
