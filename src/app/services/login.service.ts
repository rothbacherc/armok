import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { MySavesService } from './my-saves.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

export interface jwtPayload {
  uName: string,
  totalDownloads: number,
  totalUpvotes: number,
  totalDownvotes: number,
  avatar: any,
  exp: number
}

export interface jwToken {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: User
  private token: string

  //declare and initialize an observable that we use to 
  //tell the app that there has been a logout
  private logoutCallSource = new Subject<any>()
  logoutCall$ = this.logoutCallSource.asObservable()

  constructor(private mySaves: MySavesService, private router: Router, private http: HttpClient) {}

  saveToken(token: string) {
    if (token) {
      localStorage.setItem('token', token)
      this.token = token
      let payload = token.split('.')[1]
      payload = window.atob(payload)
      let jPayload: jwtPayload = JSON.parse(payload)
      this.setCurrentUser(jPayload)
    }
  }

  getToken(){
    if (!this.token) {
      this.token = localStorage.getItem('token') ? localStorage.getItem('token') : null
    }
    return this.token
  }

  loginUser(user: User): boolean {
    
    this.http.put<string>('/api/login', JSON.parse(JSON.stringify(user)))
      .subscribe((data) => {
        if(data){
          this.saveToken(data)
        }
        else{
          return false
        }
      })
      return true
  }

  createUser(user: User) {
    //type conversions to remove methods that cause browser error
    this.http.put<string>('/api/register', JSON.parse(JSON.stringify(user)))
      .subscribe((data) => {
        if (data) {
          this.saveToken(data)
        }
        else{
          return false
        }
      })
    return true
  }

  isLoggedIn(): boolean {
    let temp = this.getToken()
    if (temp) {
      let payload = temp.split('.')[1]
      payload = window.atob(payload)
      let jPayload: jwtPayload = JSON.parse(payload)
      this.setCurrentUser(jPayload)
      return jPayload.exp > Date.now() / 1000
    }
    return false
  }

  setCurrentUser(token: jwtPayload) {
    this.currentUser = new User(token.uName, token.totalDownloads, token.totalUpvotes,
      token.totalDownvotes, token.avatar)
  }
  getCurrentUser() {
    return this.currentUser
  }

  logOut() {
    this.mySaves.logoutSaves()
    this.token = ''
    this.currentUser = null
    localStorage.clear()
    this.logoutCallSource.next()
    this.router.navigate(['/'])
    //might need to navigate here
  }
}
