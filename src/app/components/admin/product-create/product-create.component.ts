import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Product} from "../../../interface/Product";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {concatMap, filter, take} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit{

  public productForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private productService:ProductService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.routeData().then(response=>{
      this.productForm.patchValue(response)
    });
  }

  public routeData():Promise<Product>{
    return new Promise((resolve,reject)=>{
      this.activatedRoute.params.pipe(
        take(1),
        filter(params=>params['id']),
        concatMap((params)=>this.productService.findById(params['id'])))
        .subscribe(result=>{
          resolve(result)
        })
    })

  }

  public initializeForm():void{
    this.productForm=this.formBuilder.group({
      id:[],
      label:["",Validators.required],
      price:["",Validators.required]
    })
  }

  public saveProduct() {
    let data: Product = this.productForm.value;

    if (data?.id) {
      this.productService.updateProduct(data).subscribe(async (res) => {
        alert("data updated successfully")
        await this.router.navigateByUrl("/admin/product-list")
      })
    } else {
      if(data?.id==null) delete data?.id;
      this.productService.saveProduct(data).subscribe(async (res) => {
        alert("data save successfully")
        await this.router.navigateByUrl("/admin/product-list")
      })
    }
  }


}
