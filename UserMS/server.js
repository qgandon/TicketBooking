const mongoose = require('mongoose');
const user = require('./routes/user');
const express = require('express');
const  bodyParser = require('body-parser');
const User = require('./Models/User');
const app = express();

mongoose.connect('mongodb://mongo_user:27017/UserMS', { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api', user);

app.get("/", (req, res) => {
    res.send("Home of UserMS");
});
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json());

app.post("/userWallet", async (req, res ) => {
    console.log(req.body._id);
    User.findById(req.body._id).then((user) => {
        if (user) {
            let wallet = user.wallet.toString();
            res.send(wallet);
        } else {
            res.send("Error");
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

app.post("/update", async (req, res) => {
    await User.findOneAndUpdate({_id :req.body._id },{
        $set:  { "wallet": req.body.wallet },
        $push : { "tickets": req.body.tickets }
    }, {new: true});
    res.send("User update!");
});

app.post("/createUser", async (req, res) => {
    let user = new User({
        username: req.body.username,
        wallet: req.body.wallet,
        tickets: req.body.tickets
    });
    console.log("User Created");
    await user.save();
    res.send(user);
});

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Listening on port ${port}...`));