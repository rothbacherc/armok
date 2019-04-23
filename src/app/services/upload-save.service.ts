import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';
import { MySavesService } from './my-saves.service';
import { BloodSaveService } from './blood-save.service';
import { AllSavesService } from './all-saves.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadSaveService {

  constructor(private mySaves: MySavesService, private bloodSaves: BloodSaveService, private allSaves: AllSavesService,
    private http: HttpClient) { }

  addNewSave(save: Save){
    this.http.put<string>('/api/upload/save', JSON.parse(JSON.stringify(save)))
      .subscribe((data) => {
        if (data) {
          if(save.isPrivate === true){
            this.mySaves.addSave(save)
          }
          else{
            if(save.isBlood){
              this.bloodSaves.addSave(save)
            }
            this.mySaves.addSave(save)
            this.allSaves.addSave(save)
          }
          return true
        }
        else{
          return false
        }
      })
  }
}
