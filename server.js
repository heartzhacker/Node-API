const express = require('express')
const app = express()
const mongoose = require('mongoose')
const product = require('./models/productModel')
const port = 4000


app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send('Node API')
// })

app.get('/products',async(req,res)=>{
    try{
        const Product = await product.find({});
        res.status(200).json(Product);
    }catch(err){
        console.log(err.mesaage)
        res.status(404).json({message: err.message})
    }
})

app.get('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const Product = await product.findById(id);
        res.status(200).json(Product);
    }catch(err){
        console.log(err.mesaage)
        res.status(404).json({message: err.message})
    }
})

app.post('/products',async(req,res)=>{
    // console.log(req.body);
    // res.send(res.body);
    try{
        const Product = await product.create(req.body)
        res.status(200).json(Product)
    }catch(error){
        console.log(error.message);
        res.status(404).json({message: error.message});
    }
})

app.patch('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const Product = await product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID: '+ id })
        }
        else{
            const updatedProduct = await product.findById(id);
            res.status(200).json(updatedProduct);
        }  
    }catch(err){
        console.log(err.mesaage)
        res.status(404).json({message: err.message})
    }
})

app.delete('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const Product = await product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID: '+ id })
        }
        else{
            res.status(200).json(Product);
        }  
    }catch(err){
        console.log(err.mesaage)
        res.status(404).json({message: err.message})
    }
})

mongoose.
connect('mongodb+srv://admin:sahil123@cluster0.f1aocfg.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MongoDB')
}).catch((error)=>{
    console.log(error)
})


app.listen(port,()=>{
    console.log('server listening on port '+ port)
})
// mongodb+srv://admin:<password>@cluster0.f1aocfg.mongodb.net/?retryWrites=true&w=majority