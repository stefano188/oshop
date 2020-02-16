import { ShoppingCart } from './shopping-cart';

export class ShoppingCartItem {
    key: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}
