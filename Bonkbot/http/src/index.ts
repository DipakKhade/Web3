import { Connection, Keypair, Transaction } from '@solana/web3.js';
import bs58 from 'bs58';
import express from 'express';
import { db } from './db';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './authMiddleware';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.post('/signup', async (req, res) => {

  const data = req.body;

  try{
    const {publicKey,secretKey} = Keypair.generate(); 
    console.log(publicKey.toString());
    const prKey = bs58.encode(secretKey);

    const userAndWallet = await db.$transaction(async(tx)=>{
      const user = await tx.user.create({
        data:{
          name:data.name,
          password:data.password
        }
      })

      const wallet = await tx.wallet.create({
        data:{
          userId:user.id,
          publicKey:publicKey.toString(),
          privateKey:prKey

        }
      })
    })

    res.json({
      publicKey
    });
    return;
   
  }catch(error:any){
    throw `${error.message}`
  }
});

app.post('/signin',async(req,res)=>{
  const data = req.body;
  
  const user = await db.user.findFirst({
    where:{
      name:data.name
    }
  })

  if(!user){
    res.json({
      message:"user not found"
    })
    return;
  }

  if(user.password !== data.password){
   res.json({
    message:"invalid password"
   })

  }

  const token = jwt.sign({
    name:user.name,
    id:user.id
  },process.env.JWT_SEC as string);

  res.json({
    token
  });
  return
  
});

app.post('/txn', authMiddleware,async(req,res)=>{

  const txn = req.body.txn;

  const deTxn = Transaction.from(Buffer.from(txn,'base64'));

  const wallet = await db.wallet.findFirst({
    where:{
      userId:req.userId
    }
  });

  if(!wallet || !wallet.privateKey){
    res.json({
      message:"wallet not found"
    });
    return;
  }
  const privateKeyArray = Uint8Array.from(JSON.parse(wallet.privateKey));
  const keypair = Keypair.fromSecretKey(privateKeyArray);
  deTxn.sign(keypair);
  const signedTxn = deTxn.serialize()

  const connection = new Connection('https://api.devnet.solana.com')
  const signature  = await connection.sendRawTransaction(signedTxn)

  res.json({
    signature
  })

  
})


app.listen(3000, () => console.log('http server is up'))
