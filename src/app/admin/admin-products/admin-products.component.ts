import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/modules/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products: Product[];
  filteredProducts: Product[];

  constructor(private productService: ProductService) {
    this.subscription = productService.getAll()
      .subscribe(p => {
        const arr: Product[] = [];
        p.forEach(element => {
          const prod: Product = {
            key: element.key,
            title: (element.val as any).title,
            price: (element.val as any).price,
            category: (element.val as any).category,
            imageUrl: (element.val as any).imageUrl
          };
          arr.push(prod);
        });
        this.filteredProducts = this.products = arr;
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

}
