import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {

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
    }))
  }

}
