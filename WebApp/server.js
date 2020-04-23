const express = require('express');
const app = express();
const axios = require('axios');
let ejs = require('ejs');
const bodyParser = require('body-parser');
exports = module.exports = {};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

exports.purchase = async function purchase(a, b) {
    let tmp = document.getElementById("user-select");
    console.log(tmp.options[tmp.selectedIndex].text);
    const resp = await axios.post("http://orderms:8081/api/order", {
    });
    console.log(a);
    console.log(b);
};


app.post('/submit_form', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.get('/', async (req, res) => {
    const ticketCall = await axios.get("http://orderms:8081/api/tickets");
    const tickets = ticketCall.data;

    const userCall =  await axios.get("http://userms:8082/api/users");
    const users = userCall.data;
    res.render("home", {
        tickets: tickets,
        users: users,
        app: app
    });
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));