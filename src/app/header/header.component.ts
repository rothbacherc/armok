import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  beOpen = false

  constructor() { }

  ngOnInit() {
  }

  doOpen(){
    console.log('yep')
    this.beOpen = !this.beOpen
  }

}
