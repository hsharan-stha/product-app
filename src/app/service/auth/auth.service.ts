import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {UserInfo} from "../../interface/UserInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDetails:UserInfo;

  constructor(private router:Router) { }

  public setLocalStorage(data:UserInfo):void{
    localStorage.setItem(environment.accessKey,JSON.stringify(data));
  }


  public isAdmin():boolean{
    return this.getUserDetails()?.role===environment.adminKey;
  }

  public getUserDetails():UserInfo{
    let accessDetails:string | null= localStorage.getItem(environment.accessKey);
    if(accessDetails){
      this.userDetails = JSON.parse(accessDetails)
    }
    return this.userDetails;
  }

  public async logout():Promise<void>{
    localStorage.clear();
    await this.router.navigateByUrl("/home")
  }
}
