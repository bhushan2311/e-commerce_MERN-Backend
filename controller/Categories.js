const { Categories } = require("../model/Categories")


exports.fetchAllCategories = async (req, res)=>{
    try {
        const categories = await Categories.find();
        // console.log('------Categories------',categories);
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json(error);
    }
}