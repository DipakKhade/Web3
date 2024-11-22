import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  getMinimumBalanceForRentExemptAccount,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export default function TokenLaunchPad({
  onTokenCreate,
}: {
  onTokenCreate: any;
}) {
  const { connection } = useConnection();

  const wallet = useWallet();

  async function LauncToken() {
    const mintKeyPair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    console.log("lamports", lamports, wallet.publicKey);
    if (wallet.publicKey) {
      const txn = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          lamports,
          newAccountPubkey: mintKeyPair.publicKey,
          space: MINT_SIZE,
          programId: TOKEN_PROGRAM_ID,
        })
      );

      txn.feePayer = wallet.publicKey;
      txn.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      txn.partialSign(mintKeyPair);

      await wallet.sendTransaction(txn, connection);
      console.log(`Token mint created at ${mintKeyPair.publicKey.toBase58()}`);
      onTokenCreate(mintKeyPair.publicKey);
    }
  }

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Solana Token Launchpad</h1>
        <input
          className="inputText"
          type="text"
          placeholder="Name"
        ></input>{" "}
        <br />
        <input
          className="inputText"
          type="text"
          placeholder="Symbol"
        ></input>{" "}
        <br />
        <input
          className="inputText"
          type="text"
          placeholder="Image URL"
        ></input>{" "}
        <br />
        <input
          className="inputText"
          type="text"
          placeholder="Initial Supply"
        ></input>{" "}
        <br />
        <button onClick={LauncToken} className="btn">
          Create a token
        </button>
      </div>
    </>
  );
}
