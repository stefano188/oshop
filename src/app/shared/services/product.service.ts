import { Product } from 'shared/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list("/products").push(product);
  }

  getAll() {
    return this.db.list("/products").snapshotChanges().pipe(map(changes => {  
      return changes.map(p => {
        const key = p.key;
        const val = p.payload.val();
        
        const prod: Product = {
          key: key,
          title: (val as any).title,
          price: (val as any).price,
          category: (val as any).category,
          imageUrl: (val as any).imageUrl
        };
        return prod;
        //return { key, val };
      })
    }));
  }

  get(productId) {
    return this.db.object("/products/" + productId);
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId) {
    return this.db.object("/products/" + productId).remove();
  }
}
