import {Component, HostBinding, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../service/auth/auth.service";
import {NgOptimizedImage} from "@angular/common";
import {UserInfo} from "../../../interface/UserInfo";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  @HostBinding("class.display-block") className="display-block";

  public userDetails:UserInfo;

  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {
    this.userDetails=this.authService.getUserDetails();
  }

  public async logout():Promise<void>{
    await this.authService.logout();
  }



}
