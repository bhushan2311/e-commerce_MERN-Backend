const { Brands } = require("../model/Brands")


exports.fetchAllBrands = async (req, res) =>{

    try {
        const brands = await Brands.find();
        // console.log('------Brands------',brands);
        res.status(200).json(brands);
    } catch (error) {
        res.status(400).json(error);
    }
}

