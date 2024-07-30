import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product/product.service";
import {from, Observable, take} from "rxjs";
import {Product} from "../../../interface/Product";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {ConfirmService} from "../../../shared/confirm/service/confirm.service";

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

  constructor(private productService:ProductService,
              private confirmService:ConfirmService,
              private router:Router) {
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
    this.confirmService.show({
      headerTitle:"Delete",
      bodyTitle:"Ready to delete",
      bodyMessage:"Are you sure to delete"
    })
    this.confirmService.getProcessConfirmation().pipe(take(1)).subscribe(res=>{
      if(res && id){
        this.deleteAction(id);
      }
    })
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
