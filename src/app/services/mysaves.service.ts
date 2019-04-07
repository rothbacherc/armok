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

  constructor() { }

  getMySaves(type: saveTypes){
    switch(type){
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

  getMyWorldSaves(){
    return this.myWorldSaves.slice()
  }

  getMySeedSaves(){
    return this.mySeedSaves.slice()
  }

  getMyFortSaves(){
    return this.myFortSaves.slice()
  }

  getMyCharacterSaves(){
    return this.myCharacterSaves.slice()
  }
}
