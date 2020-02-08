import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../modules/product';
import { ProductTransformer } from '../util/product-transformer';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../modules/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: ShoppingCart;

  category: string;

  constructor(
    private route: ActivatedRoute,
    private shopCartService: ShoppingCartService,
    productService: ProductService) {

      this.subscription = productService.getAll().subscribe(p => {
        this.filteredProducts = this.products = ProductTransformer.firebaseProductToAppProduct(p as [{key, val}]);

        this.route.queryParamMap.subscribe(param => {
          this.category = param.get('category');
          this.filteredProducts = (this.category)
            ? this.products.filter(p => p.category === this.category)
            : this.products;
        });
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shopCartService.getCart())
      .subscribe(cart => this.cart = cart);
      // .snapshotChanges()
      //   .subscribe(cart => this.cart = cart.payload.val());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
