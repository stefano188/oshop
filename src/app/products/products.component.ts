import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { Product } from '../modules/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../modules/shopping-cart';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;

  category: string;

  constructor(
    private route: ActivatedRoute,
    private shopCartService: ShoppingCartService,
    private productService: ProductService) {

      // this.subscription = productService.getAll().subscribe(p => {
      //   this.filteredProducts = this.products = p;
      //   this.route.queryParamMap.subscribe(param => {
      //     this.category = param.get('category');
      //     this.filteredProducts = (this.category)
      //       ? this.products.filter(p => p.category === this.category)
      //       : this.products;
      //   });
      // });
  }

  async ngOnInit() {
    this.populateShoppingCarts();
    this.populateProducts();
  }

  private async populateShoppingCarts() {
    this.cart$ = await this.shopCartService.getCart();
  }

  private populateProducts() {
    this.productService.getAll()
    .pipe(switchMap(p => {
      this.filteredProducts = this.products = p;
      return this.route.queryParamMap;
    })).subscribe(param => {
      this.category = param.get('category');
      
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category)
    ? this.products.filter(p => p.category === this.category)
    : this.products;
  }

}
