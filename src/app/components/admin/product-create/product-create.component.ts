import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Product} from "../../../interface/Product";
import {ProductService} from "../../../service/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {concatMap, filter, take} from "rxjs";
import {NgIf} from "@angular/common";
import {createPriceValidators} from "../../../validators/createPriceValidators";
import {FormValidateMark} from "../../../utils/FormValidateMark";
import {ConfirmService} from "../../../shared/confirm/service/confirm.service";

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
export class ProductCreateComponent extends FormValidateMark implements OnInit {

  public productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router,
              private confirmService:ConfirmService,
              private activatedRoute: ActivatedRoute) {
    super();
    this.productForm = this.formBuilder.group({
      id: [],
      label: ["", [Validators.required, Validators.minLength(3)]],
      price: ["", [Validators.required, createPriceValidators()]]
    })
  }

  ngOnInit(): void {
    this.routeData().then(response => {
      this.productForm.patchValue(response)
    });
  }

  public routeData(): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.activatedRoute.params.pipe(
        take(1),
        filter(params => params['id']),
        concatMap((params) => this.productService.findById(params['id'])))
        .subscribe(result => {
          resolve(result)
        })
    })

  }

  public saveProduct() {
    console.log(this.productForm)
    if (this.productForm.invalid) {
      this.validateAllFormFields(this.productForm)
      return;
    }

    this.confirmService.show({headerTitle:"Save", bodyTitle:"Read to save", bodyMessage:"Are you sure?"})
    this.confirmService.getProcessConfirmation().pipe(take(1)).subscribe(res=>{
      if(res){
        let data: Product = this.productForm.value;

        if (data?.id) {
          this.productService.updateProduct(data).subscribe(async (res) => {
            await this.router.navigateByUrl("/admin/product-list")
          })
        } else {
          if (data?.id == null) delete data?.id;
          this.productService.saveProduct(data).subscribe(async (res) => {
            await this.router.navigateByUrl("/admin/product-list")
          })
        }
      }
    })


  }

  public async navigateToList(): Promise<void> {
    await this.router.navigateByUrl("/admin/product-list")
  }


}
