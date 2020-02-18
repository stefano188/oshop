import { ShoppingCart } from './shopping-cart';

export class Order {
    key: string;
    datePlaced: number;
    items: any[] = [];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = !shoppingCart 
          ? [] 
          : shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          });
    }

    get totalPrice() {
      let total = 0;
      this.items.forEach(element => {
        total += element.totalPrice;
      });
      return total;
    }
}
