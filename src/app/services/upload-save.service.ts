import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';
import { MySavesService } from './my-saves.service';
import { BloodSaveService } from './blood-save.service';
import { AllSavesService } from './all-saves.service';

@Injectable({
  providedIn: 'root'
})
export class UploadSaveService {

  constructor(private mySaves: MySavesService, private bloodSaves: BloodSaveService, private allSaves: AllSavesService) { }

  addNewSave(save: Save){
    if(save.isPrivate){
      this.mySaves.addSave(save)
    }
    else{
      if(save.isBlood){
        this.bloodSaves.addSave(save)
      }
      this.allSaves.addSave(save)
    }

  }
}
