const crypto = require('crypto');

const name = '100xdevs';

let hash = crypto.createHash('sha256').update(name).digest('hex');

console.log(hash);


//

function  getHash(str) {
    let hash = crypto.createHash('sha256').update(str).digest('hex');
    return hash
}

for(let i=0;i<=1000000;i++){
    let h=getHash('100xdevs'+i.toString())
    console.log(h)
    if(h.startsWith('00')){
        console.log(h)
        break
    }
}