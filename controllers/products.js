const Product = require("../models/product");

const getAllproductStatic = async (req, res) => {

    const products = await Product.find({}).sort({ name: -1, price: 1 }).limit(6)
    // throw new Error("Express async error")
    res.status(201).json({ products, nbHits: products.length })
}

const getAllproduct = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    let queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '${gt}',
            '>=': '${gte}',
            '=': '${eq}',
            '<': '${lt}',
            '<=': '${lte}',

        }
        const regEx = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator ]: Number(value)}
            }
        })
    }

    let products = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        products = products.sort(sortList);
    } else {
        products = products.sort('createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        products = products.select(fieldsList);
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;
    products = products.skip(skip).limit(limit);
    const result = await products
    res.status(201).json({ result, nbHits: result.length })
}

module.exports = {
    getAllproduct,
    getAllproductStatic
}