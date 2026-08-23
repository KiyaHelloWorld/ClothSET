const Clothing = require("../models/Clothing");
const { errorHandler } = require("../middleware/auth");

module.exports.createClothing = (req, res) => {
	let newClothing = new Clothing ({
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		price: req.body.price
	});

	if (!req.user.isAdmin){
    	return res.status(403).send({ message: "Admin access required" })
    }

    if (!req.body.name || !req.body.price || !req.body.category ){
    	return res.status(400).send({ message: "Name, price and product category is required"})
    }

    if (typeof req.body.price !== "number" || req.body.price <= 0){
    	return res.status(400).send({ message: "Price must be a positive number"})
    }

    return Clothing.findOne({ $and: [{ name: req.body.name }, {category: req.body.category }] })
    	.then(existing => {
    		if (existing) {
    			return res.status(409).send({ message: "Product already exists"})
    		}
    		return newClothing.save()
        		.then(clothing => res.status(201).send(clothing))
        		.catch(err => errorHandler(err, req, res)); 
    	})
}

module.exports.getAllClothing = (req, res) => {
    return Clothing.find({})
    .then(products => {
        return res.status(200).send(clothing);
    })
    .catch(err => errorHandler(err, req, res))
};

module.exports.getAllActiveClothing = (req, res) => {
    return Clothing.find({ isActive: true })
    .then(products => {
        return res.status(200).send(clothing);
    })
    .catch(err => errorHandler(err, req, res))
}

module.exports.getClothing = (req, res) => {
    return Clothing.findById(req.params.productId)
    .then(clothing => {
      if (!clothing) {
        return res.status(404).send({ 
            message: "Clothing not found" 
        });
      }
      return res.status(200).send({ clothing });
    })
    .catch(err => res.status(500).send({ error: err.message }));
}; 

module.exports.updateClothing = (req, res) => {
	const { clothingId } = req.params;
	const { name, description, category, price } = req.body;

	Clothing.findById(clothingId)
	.then(clothing => {
		if(!clothing){
			return res.status(404).send({
				message: "Product not found"
			});
		}

		if (name) clothing.name = name; 
		if (description) clothing.description = description;
		if (category) clothing.category = category;
		if (price) clothing.price = price;

		return clothing.save()
		.then(updatedClothing => res.status(200).send({
			message: "Product updated successfully",
			updatedClothing
		}))
		.catch(err => res.status(500).send({
			error: err.message
		}));
	})
	.catch(err => res.status(500).send({
		error:err.message
	}));
}

module.exports.archiveClothing = (req, res) => {
	const { clothingId } = req.params;

	Clothing.findById(clothingId)
	.then(clothing => {
		if(!clothing){
			return res.status(404).send({
				message: "Product not found"
			});
		}

		if(!clothing.isActive){
  			return res.status(200).send({
  				message: "Product already archived", clothing
  			});
  		}

  		clothing.isActive = false;

  		return clothing.save()
  		.then(archivedClothing => res.status(200).send({
  			message: "Product archived successfully",
  			archivedClothing
  		}))
  		.catch(err => res.status(500).send({
  			error: err.message
  		}));
  	})
  	.catch(err => res.status(500).send({
  		error: err.message
  	}));
};

module.exports.activateClothing = (req, res) => {
  const { clothingId } = req.params;

  	Clothing.findById(productId)
  	.then(clothing => {
  		if(!clothing){
  			return res.status(404).send({
  				message: "Product not found"
  			});
  		}

  		if(clothing.isActive){
  			return res.status(200).send({
  				message: "Product already active", clothing
  			});
  		}

  		clothing.isActive = true;

	  	return clothing.save()
	  		.then(activatedClothing => res.status(200).send({
	  			message: "Product activated successfully",
	  			activatedClothing
	  		}))
	  		.catch(err => res.status(500).send({
	  			error: err.message
	  		}));
	  	})
	  	.catch(err => res.status(500).send({
	  		error: err.message
	}));
};

module.exports.searchClothingByName = (req, res) => {
	const { name } = req.body;
	
	/*
	
	$regex — matches documents where the field contains (or matches) a pattern, not just an exact value.

	$options: "i" — makes that regex match case-insensitively (so "shirt", "Shirt", "SHIRT" all match).

	*/
	return Product.find({
		name:{
			$regex: name,
			$options: "i"
		}
	})
	.then(products => res.status(200).send(products))
	.catch(err => errorHandler(err, req, res));
};

module.exports.searchClothingByPrice = (req, res) => {
	const { minPrice, maxPrice } = req.body; 

	return Clothing.find({}).then(clothings => {

		const productFiltered = clothings.filter(clothing => 
			clothing.price >= minPrice &&
			clothing.price <= maxPrice
		);

		return res.status(200).send(productFiltered);
	})
	.catch(err => errorHandler(err, req, res));
}