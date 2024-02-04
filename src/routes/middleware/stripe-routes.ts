const express = require('express');

const stripe = require("stripe")("");
const { v4: uuidv4} = require("uuid");

const router = express.Router();

router.get('/', (req:any, res:any, next:any) => {
    console.log('Hello this is your TypeScript backend');
    res.json({
         message: 'Its working!'
         });
        });

        router.post("/pay", (req:any, res:any, next:any) => {
            console.log(req.body.token);
            const {token, amount} = req.body;
            const idempotencyKey = uuidv4();

            return stripe.customers.create({
                email: token.email,
                source: token
            }).then((customer:any) => {
                stripe.charges.create({
                    amount: amount * 100,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                }, {idempotencyKey})
            }).then((result:any)=> {

                res.status(200).json(result)
            }).catch((err:any)=> {
                console.log(err);
               
            });
                    
         
    });

        module.exports = router;