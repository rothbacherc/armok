import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';
import { MySavesService } from './my-saves.service';

@Injectable({
  providedIn: 'root'
})
export class UploadSaveService {
  newSaveType: string

  constructor(private mySaves: MySavesService) { }

  addNewSave(save: Save){
    
    switch(save.type){
      case saveTypes.seed: {
        this.newSaveType = 'Seed'
        break
      }
      case saveTypes.world: {
        this.newSaveType = 'World'
        break
      }
      case saveTypes.fort: {
        this.newSaveType = 'Fort'
        break
      }
      case saveTypes.character: {
        this.newSaveType = 'Character'
        break
      }
    }

    if(save.isPrivate){
      this.mySaves.addSave(this.newSaveType, save)
    }

  }
}
