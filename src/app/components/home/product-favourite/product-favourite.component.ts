import {Component, OnInit} from '@angular/core';
import {ProductComponent} from "../../../shared/product/product.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../interface/Product";
import {map, Observable} from "rxjs";
import {ProductService} from "../../../service/product/product.service";
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: 'app-product-favourite',
  standalone: true,
  imports: [
    ProductComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './product-favourite.component.html',
  styleUrl: './product-favourite.component.css'
})
export class ProductFavouriteComponent  implements OnInit {

  private currentPage: number = 1;
  private itemPerPage: number = 10;
  private tempData: Array<Product> = [];

  public allProduct$: Observable<Array<Product>>
  public searchText: string = "";


  constructor(private productService: ProductService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData(): void {
    this.allProduct$ = this.productService.findPaginatedAllFavouriteProduct(this.currentPage, this.itemPerPage, this.authService.getUserDetails()?.id).pipe(
      map(res => this.tempData = [...this.tempData, ...res])
    );
  }


  public onScroll():void{
    this.currentPage++;
    this.fetchData();
  }
}
