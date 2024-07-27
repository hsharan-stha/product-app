import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product/product.service";
import {concat, concatMap, map, Observable, of} from "rxjs";
import {Product} from "../../../interface/Product";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {FilterPipe} from "../../../pipe/filter.pipe";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    InfiniteScrollDirective,
    FilterPipe,
    FormsModule,
    NgIf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent  implements OnInit{

  private currentPage:number=1;
  private itemPerPage:number=10;
  private tempData:Array<Product>=[];

  public allProduct$:Observable<Array<Product>>
  public searchText:string="";


  constructor(private productService:ProductService,private authService:AuthService) {
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
    if(this.authService.getUserDetails()?.id){
      if(data?.id){
        this.productService.findById(data.id)
          .pipe(
            concatMap((res)=>{
              if(res?.isFavouriteOf && res?.isFavouriteOf.some(userId=>userId===this.authService.getUserDetails()?.id)){
                alert("You have already liked this product")
                return of(undefined)
              }else{

                let updatePayload:Product;

                if(data?.isFavouriteOf){
                  let favourite:number[]=[];
                  favourite.push(this.authService.getUserDetails().id)
                  updatePayload={
                  ...data,
                  isFavouriteOf:favourite
                }
                }else{
                  updatePayload={
                    ...data,
                    isFavouriteOf:[this.authService.getUserDetails().id]
                  }
                }


               return this.productService.updateProduct(updatePayload)
              }

            })
          )
          .subscribe(res=>{
            if(res){
              alert("Item added to favourite list")
              this.fetchData();
            }
          })
      }
    }else{
      alert("Please login before add to favourite")
    }
  }

   checkIsAlreadyLiked(data:Product):boolean{
    if(data?.isFavouriteOf && this.authService.getUserDetails().id) {
      return data.isFavouriteOf.some(userId => userId !== this.authService.getUserDetails().id)
    }

    return true
  }



}
