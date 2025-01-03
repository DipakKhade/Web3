import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { getMinimumBalanceForRentExemptMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const TokenLaunchPad = () => {
  async function launchToken() {
    const connection = useConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const wallet = useWallet();
    console.log('wallet object is this', wallet)

    const keypair = new Keypair();
    if (!wallet.publicKey) {
      return
    }
    const txn = new Transaction().add(
      SystemProgram.createAccount(
        {
          fromPubkey: wallet.publicKey,
          lamports,
          newAccountPubkey: keypair.publicKey,
          programId: TOKEN_PROGRAM_ID
        }

      )
    );

    txn.feePayer = wallet.publicKey;
    txn.recentBlockhash = (await connection.connection.getLatestBlockhash()).blockhash


    const serTxn = txn.serialize()

    const txnSignature = await connection.connection.sendTransaction(serTxn)
    console.log(txnSignature)
  }
  return <>

    <div>

      <input type="text" placeholder="name"></input>

      <input type="text" placeholder="symbol"></input>

      <input type="text" placeholder="intial supply"></input>

      <input type="text" placeholder="img url"></input>

      <button onClick={launchToken}>create token</button>
    </div>

  </>
}
