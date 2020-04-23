const Order = require('../Models/Order');
const Ticket = require('../Models/Ticket');
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.send("This is our main end");
});


router.get("/tickets", (req, res )=> {
    Ticket.find().then((tickets) => {
        res.json(tickets);
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

router.delete("/ticket/:id", (req, res) => {
    Ticket.findOneAndRemove(req.params.id).then(() => {
        res.send("Ticket removed with success")
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});
router.get("/orders", (req, res )=> {
    Order.find().then((orders) => {
        res.json(orders);
        console.log(orders);
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

router.get("/order/:id", (req, res )=> {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            res.json(order);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

router.delete("/order/:id", (req, res) => {
    Order.findOneAndRemove(req.params.id).then(() => {
        res.send("Order removed with success")
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});


module.exports = router;