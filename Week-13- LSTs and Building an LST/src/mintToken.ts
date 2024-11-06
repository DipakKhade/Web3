import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { token_mint_address } from "./config";

export const mint_token = async (
  fromAddress: string,
  toAddress: string,
  token_amount: number
) => {
  try {
    const keypair = Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(fromAddress))
    );
    const connection = new Connection("https://api.mainnet-beta.solana.com");

    const recipientPublicKey = new PublicKey(toAddress);
    const mintPublicKey = new PublicKey(token_mint_address);

    // create an associated token account (ATA) for the recipient if it doesn't exist
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair, // payer's keypair
      mintPublicKey,
      recipientPublicKey // the account to receive the tokens
    );

    console.log("Associated Token Account:", ata.address.toBase58());
  } catch (error) {
    console.error("Error creating associated token account:", error);
  }
};
