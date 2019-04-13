import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: User
  private listUsers: User[] = []

  constructor() { }

  loginUser(user: User): boolean{
    if(this.listUsers.indexOf(user) !== -1){
      this.currentUser = user
      localStorage.setItem('user', this.currentUser.uName)
      console.log(this.listUsers)
      return true
    }else{
      console.log('fucc')
      return false
    }
  }

  createUser(user: User): boolean{
    if(!(this.listUsers.indexOf(user) !== -1)){
      this.listUsers.push(user)
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
    return this.currentUser.uName
  }

  logOut(){
    localStorage.clear()
    //might need to navigate here
  }
}
