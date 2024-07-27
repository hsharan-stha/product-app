import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product/product.service";
import {delay, map, Observable} from "rxjs";
import {Product} from "../../../interface/Product";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent  implements OnInit{

  private currentPage:number=1;

  public allProduct$:Observable<Array<Product>>
  constructor(private productService:ProductService) {
  }
  ngOnInit(): void {
    this.fetchData(this.currentPage);
  }

  public fetchData(page:number):void{
    const limit=10;
    const start=(page - 1) * limit;
    const end=start + limit;

    this.allProduct$=this.productService.findAllProduct().pipe(
      delay(500),
      map(res=>{
        console.log(res)
        return res.slice(start,end);
      })
    );
  }

  public next(){
    this.currentPage++;
    this.fetchData(this.currentPage)
  }

  public prev(){
    this.currentPage--;
    this.fetchData(this.currentPage)
  }

}
