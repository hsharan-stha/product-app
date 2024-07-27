import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product/product.service";
import {map, Observable} from "rxjs";
import {Product} from "../../../interface/Product";
import {AsyncPipe, NgForOf} from "@angular/common";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    InfiniteScrollDirective
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent  implements OnInit{

  private currentPage:number=1;
  private itemPerPage:number=10;
  private tempData:Array<Product>=[];

  public allProduct$:Observable<Array<Product>>


  constructor(private productService:ProductService) {
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


}
