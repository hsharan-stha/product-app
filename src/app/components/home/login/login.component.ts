import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../service/login/login.service";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {UserInfo} from "../../../interface/UserInfo";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginPayload} from "../../../interface/LoginPayload";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginForm:FormGroup;
  constructor(private loginService:LoginService,
              private authService:AuthService,
              private router:Router,
              private formBuilder:FormBuilder) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(){
    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  public login():void{
    const loginData:LoginPayload=this.loginForm.value;
    console.log(loginData)
    this.loginService.login(loginData)
      .subscribe(async res => {
        const loggedInDetail: UserInfo = res[0];
        if(res?.length === 0){
          alert("please enter valid username and password");
          return;
        }
        this.authService.setLocalStorage(loggedInDetail)
        if (loggedInDetail?.role === 'Admin') {
          await this.router.navigateByUrl("/admin")
        } else {
          await this.router.navigateByUrl("/home")
        }
      })
  }



}
