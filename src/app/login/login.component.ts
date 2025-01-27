import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginVm } from '../model/login-vm';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uservm:LoginVm=new LoginVm();
  route='/api/account/authenticate';
  constructor(private loginService:LoginService,private router:Router) { }
  form=new FormGroup({
    "username":new FormControl("",[Validators.required]),
    "password":new FormControl("",[Validators.required])
  });
  ngOnInit() {
  }
  loginClick()
  {
     this.uservm=this.form.value
    this.loginService.LoginUser(this.form.value).subscribe(
      (response)=>{
      if(response)
      {
        this.router.navigateByUrl("");
      }
      },
      (error)=>{
         console.log(error);
         alert('Login Fail');
      }
    );
  }
  get registerFormControl(){
    return this.form.controls;
  }
}
