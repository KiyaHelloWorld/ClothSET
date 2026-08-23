const Clothing = require("../models/Clothing");
const { errorHandler } = require("../middleware/auth");

module.exports.getAnalytics = async (req, res) => {
    try {
        const clothes = await Clothing.find({ userId: req.user.id });
        const totalItems = clothes.length
        
        let totalSpent = 0;
        for(const item of clothes){
            totalSpent += item.price;
        }

        const averagePrice = totalItems > 0 
            ? totalSpent / totalItems
            : 0;

        res.status(200).send({
            totalItems, 
            totalSpent, 
            averagePrice
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Failed to retrieve User Analysis"
        });
    }
};