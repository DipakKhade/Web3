import "./App.css";
import {
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { useState } from "react";

function App() {
  return (
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            <Airdrop />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

function Airdrop() {
  const [amount, SetAmount] = useState<number>(0);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  async function airDrop() {
    if (!publicKey) return;
    const res = await connection.requestAirdrop(publicKey, amount);
    console.log(res);
  }
  return (
    <>
      <input
        type="number"
        placeholder="enter lamports to airdrop ..."
        onChange={(e) => SetAmount(Number(e.target.value))}
      />
      <button onClick={airDrop}>airdop wallet</button>
    </>
  );
}
export default App;
