import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { take, switchMap } from 'rxjs/operators';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders$: Observable<Order[]>;

  constructor(
    private auth: AuthService, 
    private orderService: OrderService) { }

  ngOnInit() {
    this.myOrders$ = this.popuplateMyOrders();
  }

  popuplateMyOrders() {
    return this.auth.user$.pipe(switchMap(user => {
      return this.orderService.getAllByUserId(user.uid);
    }));
    
  }

}
