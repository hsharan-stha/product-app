import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {UserInfo} from "../../interface/UserInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDetails: UserInfo | undefined;

  constructor(private router:Router) { }

  public setLocalStorage(data:UserInfo):void{
    const dataS={...data};
    Object.defineProperty(dataS,'password',{enumerable:false})
    localStorage.setItem(environment.accessKey,JSON.stringify(dataS));
  }


  public isAdmin():boolean{
    return this.getUserDetails()?.role===environment.adminKey;
  }

  public getUserDetails():UserInfo{
    let accessDetails:string | null= localStorage.getItem(environment.accessKey);
    if(accessDetails){
      this.userDetails = JSON.parse(accessDetails)
    }
    return <UserInfo>this.userDetails;
  }

  public async logout():Promise<void>{
    localStorage.clear();
    await this.router.navigateByUrl("/login")
  }
}
