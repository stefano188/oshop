import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {

    this.categories$ = categoryService.getCategories();
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.productService.get(id).valueChanges().pipe(take(1))
        .subscribe(p => {
          this.product = p;
        });
    }    
   }

   save(product) {
     this.productService.create(product);
     this.router.navigate(['/admin/products']);
   }

}
