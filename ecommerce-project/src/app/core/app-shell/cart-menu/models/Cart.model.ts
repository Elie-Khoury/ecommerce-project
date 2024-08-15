import { IProduct } from "../../../../features/products/models/Product.model";

export interface ICartItem {
    product: IProduct,
    quantity: number
}