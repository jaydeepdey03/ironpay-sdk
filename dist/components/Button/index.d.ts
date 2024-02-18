import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    amount: Number;
    id: string;
    product: Product;
}
interface Product {
    productId: string;
    price: Number;
    name: string;
    qty: Number;
    timestamp: string;
    owner: string;
}
export declare function IronfishButton({ text, amount, id, product, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
