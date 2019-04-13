import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class TrendSavesService {
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
    
    getTopSave(){
      return this.trendSaves[1][0]
    }

    addSave(saveType: string, save: Save){
      //this.seedList.push(save)
      this.trendSaves[0].push(save)
      console.log(this.seedList)
    }
  }
