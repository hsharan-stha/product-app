import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product/product.service";
import {concat, concatMap, from, map, Observable, of} from "rxjs";
import {Product} from "../../../interface/Product";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {FilterPipe} from "../../../pipe/filter.pipe";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../service/auth/auth.service";
import {ProductComponent} from "../../../shared/product/product.component";
import {Router} from "@angular/router";
import {ToastService} from "../../../shared/toast/service/toast.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    InfiniteScrollDirective,
    FilterPipe,
    FormsModule,
    NgIf,
    ProductComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent  implements OnInit{

  private currentPage:number=1;
  private itemPerPage:number=10;
  private tempData:Array<Product>=[];

  public allProduct$:Observable<Array<Product>> = from([])
  public searchText:string="";


  constructor(private productService:ProductService,
              private router:Router,
              private toastService:ToastService,
              private authService:AuthService) {
  }
  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData():void{
    this.allProduct$=this.productService.findPaginatedAllProduct(this.currentPage,this.itemPerPage).pipe(
      map(res=>this.tempData= [...this.tempData,...res])
    );
  }

  public onScroll():void{
    this.currentPage++;
    this.fetchData();
  }

  public addToFavourite(data:Product):void{
    const userId=this.authService.getUserDetails()?.id;
    if(userId){
      if(!data?.id) {
        return
      }
        this.productService.findById(data.id)
          .pipe(
            concatMap((res)=>{
              const favourite = res?.isFavouriteOf ?? [];

              if (favourite?.includes(userId)) {
                console.log(favourite.filter(id=>id===userId))
                const updatedPayload:Product={
                  ...data,
                  isFavouriteOf:favourite.filter(id=>id!==userId)
                }

                return this.productService.updateProduct(updatedPayload);
              }

              favourite.push(userId);
              const updatePayload: Product = {
                ...data,
                isFavouriteOf: favourite
              };
              return this.productService.updateProduct(updatePayload);

            })
          )
          .subscribe(res=>{
            if(res){
              data.checked=!data.checked;
            }
          })

    }else{
      this.toastService.show("Please login before add to favourite")
      this.router.navigateByUrl("/login").then();
    }
  }

}
