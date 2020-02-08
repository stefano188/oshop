import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../modules/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private shopCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.shopCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shopCartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

}
