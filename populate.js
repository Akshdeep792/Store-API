require('dotenv').config();

const connectDB=require('./db/connect');
const Product = require('./models/product')
const jsonProducts = require('./products.json')
const start = async () => {
    try {
        await  connectDB(process.env.LOCAL_HOST);
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log("Succes....!")
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
start();
