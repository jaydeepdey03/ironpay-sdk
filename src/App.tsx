import { IronfishButton } from "../lib/main";
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
      <div>
        <button onClick={connectWallet}>connect wallet</button>
        <IronfishButton
          text="helloworld"
          amount={100000000}
          id="80aeefc0-c7c4-47e5-829b-74c10bba7767"
          style={{ color: "red", fontSize: "40px" }}
        />
      </div>
    </>
  );
}

export default App;
