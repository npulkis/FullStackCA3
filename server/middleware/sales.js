const salesModel = require("../models/sales");

const createSale = (req,res)=>
{


    salesModel.create({paypalPaymentID:req.params.paymentID,total:req.params.total,customerName:req.params.name,customerEmail:req.params.email,products:req.body},(err,data) =>
    {
        if (data){
            console.log("Payment successful")
        }else {
            console.log("payment not saved")
            res.json({errorMessage:"failed"})
        }
    })
}

const getUserSales = async (req,res)=>{

    const email = req.params.email;

    try {

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

}

const returnOrder = async (req,res)=>{

    const ID = req.params.id;

    try {

        await salesModel.findOneAndUpdate(ID,{returned:true});

        res.status(200).json({
            status: 'success',
        });
    }catch (err){
        console.log("fail")
        res.status(404).json({
            status: 'fail',
            errorMessage: err
        });
    }

}

const getSale = async (req,res)=>{

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

}


exports.createSale = createSale;
exports.getUserSales = getUserSales;
exports.returnOrder = returnOrder;
exports.getSale = getSale;