const User = require('../Models/User');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is our main end");
});

router.get("/users", (req, res )=> {
    User.find().then((users) => {
        res.json(users);
        console.log(users);
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});


router.get("/user/:id", (req, res )=> {
    console.log(req.params.id);
    User.findById(req.params.id).then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

// UPDATE

router.delete("/user/:id", (req, res) => {
    User.findOneAndRemove(req.params.id).then(() => {
        res.send("User removed with success")
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

module.exports = router;