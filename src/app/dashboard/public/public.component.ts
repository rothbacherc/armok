import { Component, OnInit } from '@angular/core';
import { Save } from 'src/app/models/save.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  showThings: boolean = false
  currentType: string
  currentIndex: number
  typeNames: string[] = ['Seeds', 'Worlds', 'Forts', 'Characters']

  constructor() {
  }

  ngOnInit() {
  }

  setSaveList(index: number) {
    this.currentType = this.typeNames[index]
    this.currentIndex = index
  }
}
