import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  getMinimumBalanceForRentExemptAccount,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export default function TokenLaunchPad() {
  const { connection } = useConnection();
  console.log(connection);

  const wallet = useWallet();

  async function LauncToken() {
    const mintKeyPair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

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
    }
  }

  return <></>;
}
