import { take, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId)
      .snapshotChanges()
        .pipe(map(cart => { 
          return cart.key 
            ? new ShoppingCart((cart.payload.val() as any).items)
            : new ShoppingCart({});
        } ));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
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

  private async updateItem(product: Product, quantityChange: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);
    item.snapshotChanges()
      .pipe(take(1))
        .subscribe(res => {
          const currentQuantity = res.key ? (res.payload.val() as any).quantity : 0;
          const quantityUpdated = currentQuantity + quantityChange;
          if (quantityUpdated === 0) {
            item.remove();
          } else {
            item.update({
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: quantityUpdated
            });
          }
    });
  }

}
