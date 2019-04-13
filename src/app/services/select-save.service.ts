import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class SelectSaveService {
  selectedSave: Save
  saveType: string
  saveShare: string
  saveBlood: string

  constructor() { }

  setSelected(save: Save){
    this.selectedSave = save
    switch(this.selectedSave.type){
      case saveTypes.seed: {
        this.saveType = 'Seed'
        break
      }
      case saveTypes.world: {
        this.saveType = 'World'
        break
      }
      case saveTypes.fort: {
        this.saveType = 'Fort'
        break
      }
      case saveTypes.character: {
        this.saveType = 'Character'
        break
      }
    }
    this.saveShare = this.selectedSave.isPrivate === true ? 'Private' : 'Public'
    this.saveBlood = this.selectedSave.isBlood === true ? 'Yes' : 'No'
  }

  getSelected(){
    return this.selectedSave
  }

  getType(){
    return this.saveType
  }

  getShare(){
    return this.saveShare
  }

  getBlood(){
    return this.saveBlood
  }
}
