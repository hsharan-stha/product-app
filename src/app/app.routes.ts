import {Routes} from '@angular/router';
import {AdminComponent} from "./components/admin/admin/admin.component";
import {ProductCreateComponent} from "./components/admin/product-create/product-create.component";
import {ProductTableComponent} from "./components/admin/product-table/product-table.component";
import {authGuard} from "./guard/auth.guard";
import {LoginComponent} from "./components/home/login/login.component";

export const routes: Routes = [
    {
        path:"home",
        loadComponent:()=>import("./components/home/home/home.component").then((m)=>m.HomeComponent),
        children:[
            {
                path:"product",
                loadComponent:()=>import("./components/home/product-list/product-list.component")
                  .then((m)=>m.ProductListComponent)
            },
            {
                path:"favourite",
                loadComponent:()=>import("./components/home/product-favourite/product-favourite.component")
                  .then((m)=>m.ProductFavouriteComponent)
            }
        ]
    },
    {
    path:"admin",
    loadComponent:()=>import("./components/admin/admin/admin.component")
      .then((m)=>AdminComponent),
    children:[
      {
        path:"product-create",
        loadComponent:()=>import("./components/admin/product-create/product-create.component")
          .then((m)=>ProductCreateComponent),
      },
      {
        path:"product-edit/:id",
        loadComponent:()=>import("./components/admin/product-create/product-create.component")
          .then((m)=>ProductCreateComponent),
      },
      {
        path:"product-table",
        loadComponent:()=>import("./components/admin/product-table/product-table.component")
          .then((m)=>ProductTableComponent),
      },
      {path:"**",redirectTo:"product-table"}
    ],
    canActivate:[authGuard]
  },
    {
      path:"login",
      loadComponent:()=>import("./components/home/login/login.component")
        .then((m)=>LoginComponent),
    },
    {path:"**",redirectTo:"home"}

];
