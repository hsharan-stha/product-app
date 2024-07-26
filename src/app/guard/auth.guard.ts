import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const router=inject(Router);
  const authService=inject(AuthService);

  if(authService.isAdmin()){
    return true;
  }

  await router.navigateByUrl("/home");
  return false;


};
