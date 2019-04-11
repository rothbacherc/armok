import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  beOpen = false
  modalOpen = false

  constructor() { }

  ngOnInit() {
  }

  doOpen(){
    this.beOpen = !this.beOpen
  }

  toggleModal(){
    console.log("yep")
    this.modalOpen = !this.modalOpen
  }

}
