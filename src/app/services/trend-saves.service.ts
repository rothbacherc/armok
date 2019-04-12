import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class TrendSavesService {
    seedList: Save[] = [
      new Save('Russia', saveTypes.seed, '', false, 'Laura'),
      new Save('Oxford', saveTypes.seed, '', false, 'Toasty'),
      new Save('Libya', saveTypes.seed, '', false, 'Zach')
    ]
    worldList: Save[] = [
      new Save('Celestia', saveTypes.world, '', false, 'Amil'),
      new Save('Illidan', saveTypes.world, '', false, 'Megan'),
      new Save('Krogan', saveTypes.world, '', false, 'Maggie')
    ]
    fortList: Save[] = [
      new Save('Damali', saveTypes.world, '', false, 'Justin'),
      new Save('Black', saveTypes.world, '', false, 'Kyle'),
      new Save('Redwall', saveTypes.world, '', false, 'Sparrow')
    ]
    characterList: Save[] = [
      new Save('Sten', saveTypes.character, '', false, 'Gabby'),
      new Save('Cael', saveTypes.character, '', false, 'Jenna'),
      new Save('Aella', saveTypes.character, '', false, 'Elizabeth')
    ]
  
    // private mySaves: Map<string, Save[]> =
    //   new Map([
    //     ['Seeds', this.seedList],
    //     ['Worlds', this.worldList],
    //     ['Forts', this.fortList],
    //     ['Characters', this.characterList]
    //   ])
    private trendSaves: Save[][] = [
      this.seedList, this.worldList, this.fortList, this.characterList
    ]
  
    constructor() { }
  
    getTrendSaves() {
      return this.trendSaves
    }
    addSave(saveType: string, save: Save){
      //this.seedList.push(save)
      this.trendSaves[0].push(save)
      console.log(this.seedList)
    }
  }
