const { Keypair, Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL } =  require("@solana/web3.js");


async function main(){
    const receiver = Keypair.generate();

    const connection = new Connection('https://api.devnet.solana.com');

    const sender = Keypair.fromSecretKey(Uint8Array.from([92,61,239,51,218,102,208,115,142,17,160,222,122,161,19,52,212,235,25,5,35,246,74,84,166,236,108,211,42,230,182,114,166,104,155,6,89,71,209,44,66,43,167,109,126,190,8,92,165,0,124,14,199,103,221,5,206,132,135,193,44,108,94,146]));

    const txn = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey:sender.publicKey,
            toPubkey:receiver.publicKey,
            lamports:LAMPORTS_PER_SOL*0.1
        })
    )

    txn.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    txn.feePayer = sender.publicKey;
    txn.partialSign(sender);

    const seriallizedTransaction = txn.serialize();
    const signature = await connection.sendRawTransaction(seriallizedTransaction);
    console.log('transaction signature :',signature);
}

main()