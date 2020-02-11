import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../modules/product';
import { ShoppingCart } from '../modules/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shopCartService: ShoppingCartService) { }

  addToCart() {
    this.shopCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shopCartService.removeFromCart(this.product);
  }
    
}
