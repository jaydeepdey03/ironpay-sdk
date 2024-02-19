import {IronfishButton} from "../lib/main";
import "./App.css";

function App() {
  const connectWallet = async () => {
    try {
      const ethereum = (window as any).ethereum;

      await ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <button onClick={connectWallet}>connect wallet</button>
        <IronfishButton
          text="Pay with Iron"
          amount={100000000}
          id="702c2087-289c-449c-821f-c1f6625ec948"
          product={{
            name: "Ironfish",
            price: 100000000,
            qty: 2,
            productId: "002",
            timestamp: "0",
            owner: "0x664b8b9892b7560b356ef0f8d44cbd1f6628e388",
          }}
          // className="ironfish-button"
        />
      </div>
    </>
  );
}

export default App;
