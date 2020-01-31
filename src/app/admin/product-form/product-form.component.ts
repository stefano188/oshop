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
    console.log('this.route.snapshot.params', this.route.snapshot.params);
    // console.log('this.route.snapshot.paramMap', this.route.snapshot.paramMap.keys);
    // console.log('this.route.snapshot.queryParams', this.route.snapshot.queryParams);
    // console.log('this.route.snapshot.queryParamMap', this.route.snapshot.queryParamMap.keys);
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.productService.get(id).valueChanges().pipe(
        map(p => {
          this.product = p;
        })
      );
    }
    
   }

   save(product) {
     this.productService.create(product);
     this.router.navigate(['/admin/products']);
   }

}
