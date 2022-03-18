const router = require(`express`).Router()
const salesModel =require('../models/sales')
const e = require("express");
const productsModel = require("../models/products");


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


// router.get(`/sales/`,(req,res)=>
// {
//     salesModel.findOne((error,data)=>
//     {
//         res.json(data)
//     })
// })


router.get(`/sales/:email`,async (req,res)=>{

    const email = req.params.email;

    try {
        // const name = new RegExp(searchQuery,`i`);

        const  sales = await salesModel.find({customerEmail: email});

        res.status(200).json({
            status: 'success',
            data:sales
        });
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

})


router.put(`/return/:id`,async (req,res)=>{

    const ID = req.params.id;

    try {
        // const name = new RegExp(searchQuery,`i`);

        await salesModel.findOneAndUpdate(ID,{returned:true});

        res.status(200).json({
            status: 'success',
        });
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

})


router.get(`/sale/:id`,async (req,res)=>{

    const ID = req.params.id;

    try {

        const  product = await salesModel.findOne({_id: ID});

        res.status(200).json({
            status: 'success',
            data:product
        });
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

})

module.exports = router