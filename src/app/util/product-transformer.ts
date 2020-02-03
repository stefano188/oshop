import { Product } from '../modules/product';

export class ProductTransformer {

    static firebaseProductToAppProduct(p: [{key, val}]): Product[] {
        const productArray: Product[] = [];
        p.forEach(element => {
          const prod: Product = {
            key: element.key,
            title: (element.val as any).title,
            price: (element.val as any).price,
            category: (element.val as any).category,
            imageUrl: (element.val as any).imageUrl
          };
          productArray.push(prod);
        });

        return productArray;
    }

}
