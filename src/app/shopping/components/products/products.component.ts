import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';
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
