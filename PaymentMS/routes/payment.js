const Payment = require('../Models/Payment');
const express = require('express');
const router = express.Router();

router.post("/payment", async (req, res) => {
    let payment = new Payment({
        userId: req.body.userId,
        userWallet: req.body.userWallet,
        ticketCost: req.body.ticketCost,
        ticketName: req.body.ticketName,
        createdAt: new Date()
    });
    await payment.save();
    res.send(payment);
});

router.get("/payments", (req, res )=> {
    Payment.find().then((payments) => {
        res.json(payments);
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

router.get("/payment/:id", (req, res )=> {
    Payment.findById(req.params.id).then((payment) => {
        if (payment) {
            res.json(payment);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

router.delete("/payment/:id", (req, res) => {
    Payment.findOneAndRemove(req.params.id).then(() => {
        res.send("Payment removed with success")
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

module.exports = router;