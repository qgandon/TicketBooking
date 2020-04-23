const mongoose = require('mongoose');
const order = require('./routes/order');
const express = require('express');
const amqp = require('amqplib');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const Order = require('./Models/Order');
const Ticket = require('./Models/Ticket');


let lastRequestId = 1;

mongoose.connect('mongodb://mongo_order:27017/OrderMS', { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api', order);


app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json());

app.post("/createOrder", async (req, res) => {
   let order = new Order({
      username: req.body.username,
      wallet: 0,
      user_id: req.body._id,
      ticket_id: req.body.ticket_id,
      ticket_name: "",
      ticket_amount: 0,
      status: req.body.status
   });

   // Get userWallet
   const wallet = await axios.post('http://userms:8082/userWallet', {
      _id: order.user_id
   });
   if (wallet) {
      order.wallet = Number(wallet.data);
   }
   // Get TicketId
   await Ticket.findById(order.ticket_id).then((ticket) => {
      if (ticket) {
         order.ticket_name = ticket.name;
         order.ticket_amount = ticket.cost;
      } else {
         console.log("problems");
         res.send("Error finding Ticket");
      }
   }).catch(err => {
      if (err) {
         throw err;
      }
   });
   await order.save();
   res.send(order);
});

app.post("/payOrder", async (req, res) => {
   Order.findById(req.body._id).then( async (order) => {
      if (order) {
         const isPaid = await axios.post('http://paymentms:8083/isPaid', {
            wallet: order.wallet,
            ticket_amount: order.ticket_amount,
            user_id: order.user_id,
            ticket_name: order.ticket_name
         });
         if (isPaid) {
            let tmp = Number(isPaid.data);
            if (tmp >= 0) {
               order.wallet = Number(isPaid.data);
               order.status = "paid";
               await order.save();
               res.send(order);
            } else {
               res.send("Not enough money");
            }
         }
      }
   })
});

app.post("/updateOrder", async (req, res) => {
   // Get userWallet
   let ticketArray = Array();
   Order.findById(req.body._id).then(async (order) => {
      if (order) {
         console.log(order);
         Ticket.findById(order.ticket_id).then(async (ticket) => {
            if (ticket) {
               console.log(ticket);
               ticketArray.push(ticket);
               console.log("ticketArray: ", ticketArray);
               const user = await axios.post("http://userms:8082/update",{
                  tickets: ticketArray,
                  wallet: order.wallet,
                  _id: order.user_id
               });
               if (user) {
                  ticket.remove();
                  res.send( "User updated");
               }
            } else {
               res.send("Error finding Ticket");
            }
         });
      } else {
         res.send("Error finding Order");
      }
   });
});

app.post("/createTicket", async (req, res) => {
   let ticket = new Ticket({
      name: req.body.name,
      cost: req.body.cost,
   });
   await ticket.save();
   res.send(ticket);
});

app.get("/", (req, res) => async(req, res) => {

   res.send("Home of order");
});


const port = process.env.PORT || 8081;
//setup();
app.listen(port, () => console.log(`Listening on port ${port}...`));
//listenForResults();
