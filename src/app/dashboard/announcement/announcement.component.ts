import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  openTab: string = 'announce'
  newSave: FormGroup
  listVisibility: string[] = ['Public', 'Private']
  listTypes: string[] = ['Seed', 'World', 'Fort', 'Character']

  constructor() { }

  ngOnInit() {
    this.newSave = new FormGroup({
      'saveName': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'type': new FormControl('', Validators.required),
      'visibility': new FormControl('', Validators.required)
    })
  }

  chooseTab(tab: string){
    this.openTab = tab
  }

}
