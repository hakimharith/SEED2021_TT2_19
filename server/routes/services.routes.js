const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller.js");
const axios = require("axios");

module.exports = function(app) {
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
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
          res.json(req.body);
    
          //Call both parties' balance first then use it to update
          //Person 1 
          req.body = {"custID":7};
    
          var config = {
            method: 'post',
            url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/view',
            headers: { 
              'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
              'Content-Type': 'application/json'
            },
            data : req.body 
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
                "amount": updateBal
              }
            };
      
            axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
            //end of Update Sender's balance
    
    
    
          })
          .catch(function (error) {
            console.log(error);
          });
    
          //person 2
    
    
        
          //Here means transfer was success, so update both accounts
          //Update Sender's balance
          //var data_sender = JSON.stringify({"custID":7,"amount":100});
    
          var updateBal = req.body.balance - req.body.amount;
    
          
    
          //Update Recipient's balance
          //var data_sender = JSON.stringify({"custID":7,"amount":100});
    
          var config = {
            method: 'post',
            url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/update',
            headers: { 
              'x-api-key': '1pigYzAdHBepN1i5E1ga2Jdug12i4Mu3Ph8PYp15', 
              'Content-Type': 'application/json'
            },
            data : {
              "payeeID": req.body.payeeID
            }
          };
    
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(" @@@@@ " + data.payeeID);
          })
          .catch(function (error) {
            console.log(error);
          });
          //end of Update Recipient's balance
    
        })
        .catch(function (error) {
          console.log(error);
        });
        
    });
    
    
    app.use('/api/transactionHistory', (req, res) =>{
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
};