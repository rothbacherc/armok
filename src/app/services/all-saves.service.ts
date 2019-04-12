import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class AllSavesService {

  private allSaves: Save[][] =[[],[],[],[]]

  constructor() { }

  getAllSaves() {
    return this.allSaves
  }

  addSave(save: Save){
    this.allSaves[save.type].push(save)
  }
}
