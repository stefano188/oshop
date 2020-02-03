import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/modules/product';
import { ProductTransformer } from 'src/app/util/product-transformer';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products: Product[];
  filteredProducts: Product[];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll()
      .subscribe(p => {
        const productArray: Product[] = ProductTransformer.firebaseProductToAppProduct(p as [{key, val}]);
        this.filteredProducts = this.products = productArray;
        this.itemCount = this.filteredProducts.length;
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

}
