require('dotenv').config();
require('express-async-errors');
const connectDB=require('./db/connect')
const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorhandlerMiddlware = require("./middleware/error-handler");
const productsRouter = require('./routes/products');

//middlewares

app.use(express.json());



//routes

app.get("/", (req,res) => {
    res.send("<h1>Store API</h1><a href='/api/v1/products'>Products Route</a>")
    // res.send("hello")
})
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware);
app.use(errorhandlerMiddlware);


// routes
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await  connectDB(process.env.LOCAL_HOST);
        app.listen(port, () => {
            console.log(`The server is live on ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();



