import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import express from 'express';
import { db } from './db';
import jwt from 'jsonwebtoken';


const app = express();
app.use(express.json())

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
  },"asd");

  res.json({
    token
  });
  return
  
});

app.post('/txn',async(req,res)=>{
  
})


app.listen(3000, () => console.log('http server is up'))
