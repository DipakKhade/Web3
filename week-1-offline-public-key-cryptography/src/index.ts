import * as ed from '@noble/ed25519';


async function main(){
    const privateKey = ed.utils.randomPrivateKey();
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const publicKey = await ed.getPublicKey(privateKey);
    const signature = await ed.sign(message, privateKey);
    const isValid = await ed.verify(signature, message, publicKey);

    return {privateKey,publicKey}
}

(async()=>{
    const keypair=await main()
    console.log(keypair)
})();