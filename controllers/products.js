const Product = require("../models/product");

const getAllproductStatic = async (req,res) => {
    const products = await Product.find({name : 'albany sectional'})
    // throw new Error("Express async error")
    res.status(201).json({products, nbHits : products.length})
}

const getAllproduct = async (req,res) => {
    const {featured, company , name} = req.query
    let queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = name
    }
    console.log(queryObject);
    const products = await Product.find(queryObject);
    res.status(201).json({products, nbHits : products.length})
}

module.exports = {
    getAllproduct,
    getAllproductStatic
}