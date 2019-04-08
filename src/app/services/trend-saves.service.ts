import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class TrendSavesService {

  private trendSaves: Map<string, Save[]> =
    new Map([
      ['Seeds', [
        new Save('Russia', saveTypes.seed, '', true, 'Laura'),
        new Save('Oxford', saveTypes.seed, '', true, 'Toasty'),
        new Save('Libya', saveTypes.seed, '', true, 'Zach')
      ]],
      ['Worlds', [
        new Save('Celestia', saveTypes.world, '', true, 'Amil'),
        new Save('Illidan', saveTypes.world, '', true, 'Megan'),
        new Save('Krogan', saveTypes.world, '', true, 'Maggie')
      ]],
      ['Forts', [
        new Save('Damali', saveTypes.world, '', true, 'Justin'),
        new Save('Black', saveTypes.world, '', true, 'Kyle'),
        new Save('Redwall', saveTypes.world, '', true, 'Sparrow')
      ]],
      ['Characters', [
          new Save('Sten', saveTypes.character, '', true, 'Gabby'),
        new Save('Cael', saveTypes.character, '', true, 'Jenna'),
        new Save('Aella', saveTypes.character, '', true, 'Elizabeth')
      ]]
    ])

  constructor() { }

  getTrendSaves() {
    return this.trendSaves
  }
}
