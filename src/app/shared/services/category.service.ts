import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    let ref = this.db.list("/categories");
    return ref.snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        const key = c.key;
        const val = c.payload.val();
        return { key, val } ;
      })
    }));
  }
}
