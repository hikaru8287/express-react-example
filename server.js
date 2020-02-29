const express = require('express');
const nodemailer = require('nodemailer');
const creds = require('./config');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

var transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
}
  
var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
if (error) {
    console.log(error);
} else {
    console.log('All works fine, congratz!');
}
});

app.use(express.json()); app.post('/send', (req, res, next) => {
    const name = req.body.name
    const email = req.body.email;
    var mail = {
        from: name,
        to: email,  
        subject: 'Test NodeMailer'
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            msg: 'fail'
          })
        } else {
          res.json({
            msg: 'success'
          })
        }
      })
    });