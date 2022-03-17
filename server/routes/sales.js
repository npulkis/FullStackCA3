const router = require(`express`).Router()
const salesModel =require('../models/sales')
const e = require("express");


router.post(`/sales/:paymentID/:total/:name/:email`,(req,res)=>
{


    salesModel.create({paypalPaymentID:req.params.paymentID,total:req.params.total,customerName:req.params.name,customerEmail:req.params.email,products:req.body},(err,data) =>
    {
        if (data){
            console.log("Payment succesdful")
        }else {
            console.log("payment not saved")
            res.json({errorMessage:"failed"})
        }
    })
})

module.exports = router