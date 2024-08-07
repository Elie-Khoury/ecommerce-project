import { IProduct } from "../../../../shared/models/product";

export interface ICartItem {
    product: IProduct,
    quantity: number
}