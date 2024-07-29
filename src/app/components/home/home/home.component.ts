import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SidebarComponent} from "../../../shared/sidebar/sidebar.component";
import {TopBarComponent} from "../../../shared/top-bar/top-bar.component";
import {AuthService} from "../../../service/auth/auth.service";
import {UserInfo} from "../../../interface/UserInfo";
import {SideBar} from "../../../interface/SideBar";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [RouterOutlet, SidebarComponent, TopBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public userDetails:UserInfo | undefined;

  public sideBarList:SideBar[]=[
    {
      label:"Product List",
      icon:"Home.svg",
      url:"/home/product"
    } ,{
      label:"Favourite List",
      icon:"Product.svg",
      url:"/home/favourite"
    }
  ]

  constructor(private router:Router,private authService:AuthService) {
  }

  ngOnInit(): void {
    this.userDetails=this.authService.getUserDetails();
  }


  public async navigateToLogin():Promise<void>{
    await this.router.navigateByUrl("/login")
  }

  public async logout():Promise<void>{
    await this.authService.logout();
  }

}
