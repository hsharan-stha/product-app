import {Component, HostBinding, OnInit} from '@angular/core';
import {LoginService} from "../../../service/login/login.service";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {UserInfo} from "../../../interface/UserInfo";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginPayload} from "../../../interface/LoginPayload";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormValidateMark} from "../../../utils/FormValidateMark";
import {ToastService} from "../../../shared/toast/service/toast.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends FormValidateMark implements OnInit {

  @HostBinding("class.app-login-style") className: string = ".app-login-style";

  public loginForm: FormGroup;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router,
              private toastService:ToastService,
              private formBuilder: FormBuilder) {
    super();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }


  public login(): void {
    if(this.loginForm.invalid){
    this.validateAllFormFields(this.loginForm);
      return;
    }
    const loginData: LoginPayload = this.loginForm.value;
    this.loginService.login(loginData)
      .subscribe(async res => {
        const loggedInDetail: UserInfo = res[0];
        if (res?.length === 0) {
          this.toastService.show("please enter valid username and password")
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
