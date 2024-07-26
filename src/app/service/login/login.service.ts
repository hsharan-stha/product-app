import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, map, Observable} from "rxjs";
import {UserInfo} from "../../interface/UserInfo";
import {LoginPayload} from "../../interface/LoginPayload";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userConfigUrl:string=`/assets/config/user.json`

  constructor(private httpClient:HttpClient) { }

  public login(data:LoginPayload):Observable<UserInfo[]>{
    return this.httpClient.get<UserInfo[]>(this.userConfigUrl).pipe(
     map((users:Array<UserInfo>)=>
        users.filter(i=>i.username===data?.username && i.password === data?.password)
     )
    )
  }

}
