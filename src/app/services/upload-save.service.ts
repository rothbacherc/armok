import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';
import { MySavesService } from './my-saves.service';
import { BloodSaveService } from './blood-save.service';
import { AllSavesService } from './all-saves.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileSave } from '../models/fileSave.model';

@Injectable({
  providedIn: 'root'
})
export class UploadSaveService {

  constructor(private mySaves: MySavesService, private bloodSaves: BloodSaveService, private allSaves: AllSavesService,
    private http: HttpClient) { }

  addNewSave(save: Save, file: FileSave){
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
    
    
    let headers = new HttpHeaders
    let reqFile = new FormData()
    reqFile.append('sFile', file.sFile)
    console.log(file.sFile)
    this.http.put<any>('/api/upload/file', file.sFile)
      .subscribe((data) => {
        console.log(data)
      })
  }
}
