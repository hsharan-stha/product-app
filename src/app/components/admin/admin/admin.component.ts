import {Component, HostBinding, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../service/auth/auth.service";
import {NgOptimizedImage} from "@angular/common";
import {UserInfo} from "../../../interface/UserInfo";
import {SidebarComponent} from "../../../shared/sidebar/sidebar.component";
import {SideBar} from "../../../interface/SideBar";
import {TopBarComponent} from "../../../shared/top-bar/top-bar.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
    SidebarComponent,
    TopBarComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  @HostBinding("class.display-block") className="display-block";

  public userDetails:UserInfo | undefined;

  public sideBarList:SideBar[]=[
    {
      label:"Product",
      icon:"Home.svg",
      url:"/admin/product-table"
    }
  ]

  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {
    this.userDetails=this.authService.getUserDetails();
  }

  public async logout():Promise<void>{
    await this.authService.logout();
  }



}
