import { JaydeepButton } from "../lib/main";
import "./App.css";

function App() {


  const connectWallet = async () => {
    try {
      const ethereum = (window as any).ethereum;

      const accounts = await ethereum.request({ method: "eth_requestAccounts" }); // request connection with accounts
      // console.log("Connected", accounts[0]);
      // setCurrentAccount(accounts[0]);
      // const chainId = await ethereum.request({ method: 'eth_chainId' });

    }
    catch (e) {
      console.log(e);
    }
  }

  const address = "0xd7fdd1521fcf9571b4452295cf42e07a1479fcac552cae28e5a821ff69ce7ee1"

  return (
    <>
      <div>
        <button onClick={connectWallet}>connect wallet</button>
        <JaydeepButton
          text="helloworld"
          amount={100000000}
          address={address}
          style={{ color: "red", fontSize: "40px" }}
        />
      </div>
    </>
  );
}

export default App;
