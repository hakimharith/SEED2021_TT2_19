const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
const app = express();

//const db = require("./models");

//db.sequelize.sync()

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//Invclude routes here


app.get("/", (req, res) => {
    res.send("Express connection success")
});


app.use('/api/transfer', (req, res) =>{
    // var data = JSON.stringify({"custID":7,"payeeID":9,"dateTime":"2020-07-03T05:30:39.445Z","amount":0.01,"expensesCat":"Transport","eGift":true,"message":"msg"});

    req.body = {"custID":7,"payeeID":9,"dateTime":"2020-07-03T05:30:39.445Z","amount":0.01,"expensesCat":"Transport","eGift":true,"message":"msg"};

    var config = {
      method: 'post',
      url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/add',
      headers: { 
        'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
        'Content-Type': 'application/json'
      },
      data : req.body
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      //res.json(response.data)
      //res.json(req.body);

      //Here means transfer was success, so update both accounts

      //Call both parties' balance first then use it to update
      //Person 1 
      //req.body = {"custID":7};
      var config = {
        method: 'post',
        url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/view',
        headers: { 
          'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
          'Content-Type': 'application/json'
        },
        data : {
          "custID": req.body.custID
        } 
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        //Get the availBal from response data
        var config = {
          method: 'post',
          url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/update',
          headers: { 
            'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
            'Content-Type': 'application/json'
          },
          data : {
            "custID": req.body.custID,
            "amount": response.data.availableBal - req.body.amount
          }
        };
  
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });

      //Person 2
      //req.body = {"payeeID":9};

      var config = {
        method: 'post',
        url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/view',
        headers: { 
          'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
          'Content-Type': 'application/json'
        },
        data : {
          "custID": req.body.payeeID
        }
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        //Get the availBal from response data
        var config = {
          method: 'post',
          url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/update',
          headers: { 
            'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
            'Content-Type': 'application/json'
          },
          data : {
            "custID": req.body.payeeID,
            "amount": response.data.availableBal - req.body.amount
          }
        };
  
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    
});


app.post('/api/updateCust', (req, res) =>{
  //var data = JSON.stringify({"custID":9});

  req.body = {"custID":7};

  var config = {
      method: 'post',
      url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view',
      headers: { 
          'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
          'Content-Type': 'application/json'
      },
      data : req.body
      };

      axios(config)
      .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.json(response.data)
      })
      .catch(function (error) {
      console.log(error);
      });
  });


app.use('/api/view', (req, res) =>{
    //var data = JSON.stringify({"custID":9});

    req.body = {"custID":7};

    var config = {
        method: 'post',
        url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view',
        headers: { 
            'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
            'Content-Type': 'application/json'
        },
        data : req.body
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.json(response.data)
        })
        .catch(function (error) {
        console.log(error);
        });
    });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
});