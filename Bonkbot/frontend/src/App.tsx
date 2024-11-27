import React, { FC, InputHTMLAttributes, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

import './App.css'

function App() {

  return (
    <ConnectionProvider endpoint={`https://api.devnet.solana.com`}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <SendSOL/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  )
}

export default App


function SendSOL(){
  const sendTxn = async() =>{
    const connection = new Connection(`https://api.devnet.solana.com`);

    const to = (document.getElementById('publickey') as HTMLInputElement)?.value;
    const lamports = (document.getElementById('lam') as HTMLInputElement).value as unknown as number;

    const txn = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey:new PublicKey("8ZuJ91PZX9Y847kJco9KbY4USZqTKNL3FmGBZ2ZwMfAe"),
        toPubkey:new PublicKey(to),
        lamports:lamports*LAMPORTS_PER_SOL

      })
    );

    // const payer = new PublicKey("GjmrjWrLPn1ES6HXAhg2dBnvf5cWz4RbdsK3HsE3Lo8e")

    // txn.partialSign(payer)

    txn.recentBlockhash= (await connection.getLatestBlockhash()).blockhash;
    txn.feePayer = new PublicKey("8ZuJ91PZX9Y847kJco9KbY4USZqTKNL3FmGBZ2ZwMfAe");

    const seriallizedTransaction = txn.serialize({
      requireAllSignatures:false,
      verifySignatures:false
    });
    // const signature = await connection.sendRawTransaction(seriallizedTransaction);
    console.log(seriallizedTransaction)

    await fetch(`http://localhost:3000/txn`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGlwYWsiLCJpZCI6MywiaWF0IjoxNzMyNzE5NDEyfQ.jUC-Ye6fQTvMDd5En6S_Bh_M2jxzcVvADuszTckYDAk"
      },
      body:JSON.stringify({
        txn:seriallizedTransaction
      })
    })


  }

  return<>
  <div>
    <input id='publickey' type="text" placeholder='enter public key' />
    <input id='lam' type="number" placeholder='enter lamports' />
    <button onClick={sendTxn}>sendTxn</button>
  </div>
  </>
}