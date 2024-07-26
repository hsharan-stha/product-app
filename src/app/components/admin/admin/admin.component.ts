import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private authService:AuthService) {
  }

  public async logout():Promise<void>{
    await this.authService.logout();
  }

}
