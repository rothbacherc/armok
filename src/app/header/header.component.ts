import { Component, OnInit, DoCheck } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  dropOpen = false
  modalOpen = false
  loginOpen = false
  hamOpen = false
  createModal = false
  modalType: string
  signInForm: FormGroup
  signUpForm: FormGroup
  userToken: User

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  ngDoCheck(){
    
  }

  toggleDrop(){
    this.dropOpen = !this.dropOpen
  }

  toggleModal(modalType?: string){
    this.modalOpen = !this.modalOpen
    this.modalType = modalType === 'create' ? 'create' : 'login'
  }

  toggleLogin(){
    this.loginOpen = !this.loginOpen
  }

  toggleHam(){
    this.hamOpen = !this.hamOpen
  }

  swapModal(modalType: string){
    this.modalType = modalType === 'create' ? 'create' : 'login'
  }

  onSignSubmit(){
    this.userToken = new User(this.signInForm.controls.username.value, this.signInForm.controls.password.value)
    if(this.loginService.loginUser(this.userToken)){
      this.toggleModal()
      this.signInForm.reset()
    }
  }

  onCreateSubmit(){
    this.userToken = new User(this.signUpForm.controls.username.value, this.signUpForm.controls.password.value,
      this.signUpForm.controls.email.value)
    if(this.loginService.createUser(this.userToken)){
      this.toggleModal()
      this.signUpForm.reset()
    }
  }

  sendLogout(){
    this.toggleDrop()
    this.loginService.logOut()
  }
}
