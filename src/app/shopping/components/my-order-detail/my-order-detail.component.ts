import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.component.html',
  styleUrls: ['./my-order-detail.component.css']
})
export class MyOrderDetailComponent implements OnInit {

  order$: Observable<Order>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.order$ = this.populateOrder();
  }

  private populateOrder() {
    return this.route.paramMap.pipe(switchMap(param => {
      let orderId = param.get('id');
      return this.orderService.get(orderId);
    }));
  }

}
