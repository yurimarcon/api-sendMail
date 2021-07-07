import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { sendMail } from './sendMail.js'
const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const app = express()
const port = (process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    app.use(cors())
    next();
});

app.get('/', (req, res) => {
    res.send('API rodando')
})
app.get('/sendMail-dev', (req, res) => {
    
    const data = req.body
    data.to = "yuri.erik.oliveira@gmail.com"
    data.subject = "Teste de envio de e-mail"

    try{
        sendMail(data)
        res.send({"statusCode": "200" })
    }catch(e){
        res.send({"statusCode": "400 -"+ e })
    }
})

app.post('/sendMail', (req, res) => {
    
    const data = req.body

    if(data.to && data.subject){
        sendMail(data)
        console.log(`API rodando no endpoint http://localhost:${port}`)
        res.send({"statusCode": "200" })
    }else{
        res.send({
            "statusCode": "400",
            "erro": "A API espera receber os campos {to, subject, nome, descricao, email, telefone}"
        })
    }
})

app.listen(port, () => {
    const msg = `

        /$$$$$$  /$$$$$$$  /$$$$$$
       /$$__  $$| $$__  $$|_  $$_/
      | $$  v $$| $$  v $$  | $$  
      | $$$$$$$$| $$$$$$$/  | $$  
      | $$__  $$| $$____/   | $$  
      | $$  | $$| $$        | $$  
      | $$  | $$| $$       /$$$$$$
      |__/  |__/|__/      |______/
    
    `
    console.log(msg)
    console.log(`API rodando no endpoint http://localhost:${port}`)
})