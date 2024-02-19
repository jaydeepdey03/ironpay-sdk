## Installation

Install my-project with npm

```bash
  npm install ironpay-sdk
```

## Usage/Examples

```javascript
import {IronFishButton} from "ironpay-sdk";

export default function YourApp() {
  return (
    <IronFishButton
      id="your-api-key"
      text="Pay with Iron"
      amount={100000000}
      // example product object
      product={{
        name: "Ironfish",
        price: 100000000,
        qty: 2,
        productId: "002",
        timestamp: "your date string",
      }}
    />
  );
}
```
