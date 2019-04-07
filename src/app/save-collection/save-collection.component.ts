import { Component, OnInit } from '@angular/core';
import { MySavesService } from '../services/mysaves.service';

@Component({
  selector: 'app-save-collection',
  templateUrl: './save-collection.component.html',
  styleUrls: ['./save-collection.component.css']
})
export class SaveCollectionComponent implements OnInit {
  public type: saveTypes

  constructor(private mySaves: MySavesService) { }

  ngOnInit() {
  }

}
