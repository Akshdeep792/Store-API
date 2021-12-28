const getAllproductStatic = async (req,res) => {
    res.status(201).json({msg : "Product testing route"})
}

const getAllproduct = async (req,res) => {
    res.status(201).json({msg : "Product route"})
}

module.exports = {
    getAllproduct,
    getAllproductStatic
}