import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../modules/product';
import { ProductTransformer } from '../util/product-transformer';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {

  subscription: Subscription;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(
    private route: ActivatedRoute,
    productService: ProductService, 
    categoryService: CategoryService) { 

      this.subscription = productService.getAll().subscribe(p => {
        this.products = ProductTransformer.firebaseProductToAppProduct(p as [{key, val}]);
      });
      
      this.categories$ = categoryService.getAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCategoryChanged() {
    this.route.queryParamMap.subscribe(param => {
      this.category = param.get('category');
      this.filteredProducts = (this.category) 
        ? this.products.filter(p => p.category === this.category)
        : this.products;
    });
    
  }
}
