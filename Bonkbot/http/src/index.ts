
import express from 'express';


const app = express();

app.post('/sigup', async (req, res) => {
  res.status(200).json({
    message: "signup successfull"
  })
})


app.post('/sigup', async (req, res) => {
  const data = req.body;

  res.status(200).json({
    message: "signup successfull"
  })
})


app.post('/createWallet', async (req, res) => {

})


app.listen(3000, () => console.log('http server is up'))
