import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    amount: Number;
    address: string;
}
export declare function JaydeepButton({ text, amount, address, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
