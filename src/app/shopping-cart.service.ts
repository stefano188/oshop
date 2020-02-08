import { take, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './modules/product';
import { ShoppingCart } from './modules/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId)
      .snapshotChanges()
        .pipe(map(cart => new ShoppingCart((cart.payload.val() as any).items)));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const cart = await this.create();
    localStorage.setItem('cartId', cart.key);
    return cart.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, quantityChange: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);
    item.snapshotChanges()
      .pipe(take(1))
        .subscribe(res => {
          const currentQuantity = res.key ? (res.payload.val() as any).quantity : 0;
          item.update({product, quantity: currentQuantity + quantityChange});
    });
  }

}
