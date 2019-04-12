import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class BloodSaveService {

  private bloodSaves: Save[][] = [[],[],[],[]]

  constructor() { }

  getBloodSaves() {
    return this.bloodSaves
  }

  addSave(save: Save){
    this.bloodSaves[save.type].push(save)
  }
}
