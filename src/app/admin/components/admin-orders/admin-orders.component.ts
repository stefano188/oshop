import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.orderService.getAll().subscribe(orders => this.orders = orders);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
