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

function App() {
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
            <TokenLaunchPad />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
