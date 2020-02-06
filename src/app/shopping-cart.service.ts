import { take } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './modules/product';

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

  private getCart(cartId: string) {
    return this.db.object("/shopping-carts/" + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const cart = await this.create();
    localStorage.setItem('cartId', cart.key);
    return cart.key;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);
    item.snapshotChanges()
      .pipe(take(1))
        .subscribe(res => {
          const currentQuantity = res.key ? (res.payload.val() as any).quantity : 0;
          item.update({product, quantity: currentQuantity + 1});
    });
  }
}
