import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product/product.service";
import {from, Observable} from "rxjs";
import {Product} from "../../../interface/Product";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit{

  public currentPage:number=1;
  private itemPerPage:number=10;

  public getAllData$:Observable<Array<Product>> =from([]);

  constructor(private productService:ProductService,private router:Router) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData():void{
  this.getAllData$=this.productService.findPaginatedAllProduct(this.currentPage,this.itemPerPage)
}

  public async navigateToCreate():Promise<void>{
    await this.router.navigateByUrl("/admin/product-create")
  }

  public async navigateToEdit(id:string | undefined):Promise<void>{
    await this.router.navigateByUrl(`/admin/product-edit/${id}`)
  }

  public confirmDelete(id:string | undefined){
    if(id && window.confirm('Are you sure to delete?')){
      this.deleteAction(id)
    }
  }

  private deleteAction(id:string){
    this.productService.deleteById(id).subscribe({
      next:()=>{
        this.fetchData();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  public prev():void{
    this.currentPage--;
    if(this.currentPage < 0){
      this.currentPage=1;
    }

    this.fetchData()
  }

  public next():void{
    this.currentPage++;
    this.fetchData()
  }


}
