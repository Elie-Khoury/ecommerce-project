export interface IPaymentDetails {
    [key: string]: string;
    fullName: string,
    cardNum: string,
    expiration: string,
    cvc: string,
    country: string
}