import React, { useEffect, useState } from "react";
import "./index.css";
import { ethers } from "ethers";
import contractABI from "./WIRON_abi.json";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  amount: Number;
  address: string;
}

export function IronfishButton({
  text,
  amount,
  address,
  ...props
}: ButtonProps) {
  const [contract, setcontract] = useState<ethers.Contract>();

  const contractAddress = "0x3dE166740d64d522AbFDa77D9d878dfedfDEEEDE";
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    const getContract = () => {
      if ((window as any).ethereum) {
        // Access ethereum here
        const ethereum = (window as any).ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const WIRON_Contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setcontract(WIRON_Contract);
      } else {
        console.error("Ethereum provider not found");
      }
    };
    getContract();
  }, []);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if ((window as any).ethereum) {
          const ethereum = (window as any).ethereum;

          const accounts = await ethereum.request({ method: "eth_accounts" }); //check if there are accounts connected to the site

          if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
          } else {
            setCurrentAccount("");
            console.log("No authorized accounts found!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIfWalletIsConnected();
  }, [currentAccount, contractABI]);

  const transferWIRON = (amount: Number, address: string) => {
    console.log(amount, address, "--testing");
    if ((window as any).ethereum && contract) {
      contract.transferWithMetadata(
        "0x664b8b9892b7560b356ef0f8d44cbd1f6628e388",
        amount,
        address
      );
    }
  };

  const { className, ...restProps } = props;
  return (
    <button
      className={`${className} my-button`}
      {...restProps}
      onClick={() => transferWIRON(amount, address)}
    >
      {text}
    </button>
  );
}
