import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { LoginVm } from '../model/login-vm';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserName:any="";
  url:string;
  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string) {
    this.url=baseUrl
   }
  LoginUser(user:LoginVm):Observable<any>
  {
    return this.http.post<any>(this.url+"api/account/authenticate",user)
    .pipe(map(u=>{
      if(u)
      {
       this.currentUserName=u.username;
      // sessionStorage['currentUser']=JSON.stringify(u);
       localStorage.setItem("userName",u.userName)
       localStorage.setItem('user',JSON.stringify(u))
       localStorage.setItem('jwt',JSON.stringify(u.token))
      }
      return u;
    }))
  }
}
