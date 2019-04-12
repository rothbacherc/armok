import { Injectable } from '@angular/core';
import { Save } from '../models/save.model';

@Injectable({
  providedIn: 'root'
})
export class AllSavesService {

  allSaves: Map<string, Save[]> = new Map([])

  constructor() { }

  getTrendSaves() {
    return this.allSaves
  }

  addSave(saveType: string, save: Save){
    this.allSaves.set(saveType, [save])
  }
}
