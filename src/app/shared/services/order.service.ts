import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list("/orders").push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getAll() {
    return this.db.list("/orders").snapshotChanges()
      .pipe(map(res => {
        return res.map(o => {
          const orderVal = o.payload.val() as any;
          let order = new Order(orderVal.userId, orderVal.shipping, null);
          order.key = o.key;
          return order;
        })
      }));
  }

  get(orderId: string) {
    return this.db.object("/orders/" + orderId).snapshotChanges()
      .pipe(map(res => {
        let detail = res.payload.val() as any;
        let order = new Order(detail.userId, detail.shipping, null);
        detail.items.forEach(element => {
          order.items.push(element);
        });
        return order;
      }));
  }

}
