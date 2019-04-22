import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { MySavesService } from './my-saves.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: User
  private listUsers: string[] = []

    //declare and initialize an observable that we use to 
  //tell the app that there has been a logout
  private logoutCallSource = new Subject<any>()
  logoutCall$ = this.logoutCallSource.asObservable()

  constructor(private mySaves: MySavesService, private router: Router, private http: HttpClient) { }

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

  createUser(user: User){
    console.log(JSON.parse(JSON.stringify(user)))
    //type conversions to remove methods that cause browser error
    
    this.http.put<User>('/api/register', JSON.parse(JSON.stringify(user)))
      .subscribe(
        
      )
    return true
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
    this.logoutCallSource.next()
    this.router.navigate(['/'])
    //might need to navigate here
  }
}
