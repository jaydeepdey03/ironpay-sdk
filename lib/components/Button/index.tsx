import React, {useEffect, useState} from "react";
import "./index.css";
import {ethers} from "ethers";
import contractABI from "./WIRON_abi.json";
import merchantABI from "./merchant_abi.json";

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

// function fetchAddressById(id: string) {
//   const merchantContractAddress = "0x8f5E581Df6B83d8f36Fd1701ce4719524Bc33850";

//   const ethersProvider = new ethers.providers.Web3Provider(
//     (window as any).ethereum
//   );
//   const contract = new ethers.Contract(
//     merchantContract,
//     merchantABI,
//     ethersProvider.getSigner()
//   );
//   const address = contract.getAddressById(id);
//   console.log("Address: ", address);
//   return address;
// }

export function IronfishButton({
  text,
  amount,
  id,
  product,
  ...props
}: ButtonProps) {
  const [contract, setcontract] = useState<ethers.Contract>();
  const [merchantContract, setMerchantContract] = useState<ethers.Contract>();

  const [ironfishAddress, setIronfishAddress] = useState("");

  const contractAddress = "0x3dE166740d64d522AbFDa77D9d878dfedfDEEEDE";
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    const getContract = async () => {
      if ((window as any).ethereum) {
        const merchantContractAddress =
          "0x8f2806160077e9cd6532DBC6F1886082479290f6";

        // Access ethereum here
        const ethereum = (window as any).ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const WIRON_Contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const merchantContract = new ethers.Contract(
          merchantContractAddress,
          merchantABI,
          signer
        );
        const address = await merchantContract.getAddressById(id);
        setMerchantContract(merchantContract);
        setIronfishAddress(address);

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

          const accounts = await ethereum.request({method: "eth_accounts"}); //check if there are accounts connected to the site

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

  const transferWIRON = (amount: Number, address: string, product: Product) => {
    console.log(amount, address, "--testing");
    if ((window as any).ethereum && contract && merchantContract) {
      merchantContract.transferWIRON(
        "0x664b8b9892b7560b356ef0f8d44cbd1f6628e388",
        amount,
        address,
        product.productId,
        product.name,
        product.price,
        product.qty
      );
      console.log("Amount sent");
    }
  };

  const {className, ...restProps} = props;
  return (
    <button
      className={`${className} ironfish-button my-button`}
      {...restProps}
      onClick={() => transferWIRON(amount, ironfishAddress, product)}
      style={{display: "flex", alignItems: "center"}}
    >
      <img
        src="https://ironfish.network/_next/static/media/hex-fish.ceace82e.svg"
        alt="iron"
        style={{width: "31px", height: "20px", marginRight: "10px"}}
      />
      {text}
    </button>
  );
}
