import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { MySavesService } from './my-saves.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: User
  private listUsers: string[] = []

  constructor(private mySaves: MySavesService) { }

  loginUser(user: User): boolean{
    let num = this.listUsers.indexOf(user.uName)
    if(num !== -1){
      this.currentUser = user
      localStorage.setItem('user', this.currentUser.uName)
      return true
    }
    else{
      return false
    }
  }

  createUser(user: User): boolean{
    if(!(this.listUsers.indexOf(user.uName) !== -1)){
      this.listUsers.push(user.uName)
      return this.loginUser(user)
    }
    return false
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('user')){
      return true
    }
    return false
  }

  getCurrentUsername(){
    return localStorage.getItem('user')
  }

  logOut(){
    this.mySaves.logoutSaves()
    localStorage.clear()
    //might need to navigate here
  }
}
