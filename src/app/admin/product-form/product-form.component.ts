import { Product } from 'src/app/modules/product';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {} as Product;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {

    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.productService.get(this.id).valueChanges().pipe(take(1))
        .subscribe(p => {
          this.product = p as Product;
        });
    }
   }

   save(product) {
     if (this.id) {
       this.productService.update(this.id, product);
     } else {
       this.productService.create(product);
     }
     this.router.navigate(['/admin/products']);
   }

   delete() {
    if (!confirm('Are you sure ?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
   }

}
