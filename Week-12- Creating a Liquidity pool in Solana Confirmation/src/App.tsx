import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import TokenLaunchPad from "./components/TokenLaunchpad";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <ConnectionProvider
        endpoint={
          "https://solana-mainnet.g.alchemy.com/v2/yBzlkWFR7LyZlmSKMjCBgTJEYK9LIktp"
        }
      >
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            <TokenLaunchPad
              onTokenCreate={(tokenMint: any) => {
                console.log("hello");
                setToken(tokenMint);
              }}
            />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
