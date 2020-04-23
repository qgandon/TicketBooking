const mongoose = require('mongoose');
const payment = require('./routes/payment');
const express = require('express');
const Payment = require('./Models/Payment');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://mongo_payment:27017/PaymentMS', { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api', payment);

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json());


app.post("/isPaid", async (req, res) => {
    let userWallet = req.body.wallet;
    let ticketAmount = req.body.ticket_amount;
    if (userWallet - ticketAmount < 0) {
        let tmp = -10;
        res.send(tmp.toString());
    } else {
        let newWallet = userWallet - ticketAmount;
        let payment = new Payment({
            userId: req.body.user_id,
            userWallet: newWallet,
            ticketCost: ticketAmount,
            ticketName: req.body.ticket_name,
            createdAt: new Date()
        });
        await payment.save();
        res.send(newWallet.toString());
    }
});

app.get("/", (req, res) => {
    res.send("Home of PaymentMS");
});

const port = process.env.PORT || 8083;
app.listen(port, () => console.log(`Listening on port ${port}...`));