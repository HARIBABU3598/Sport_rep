const ProductModel = require("../models/productModel.jsx");

// Get Products API = /api/v1/products
exports.getProducts = async (request, response, next) => {

  const query = request.query.keyword?{ name :  {
    $regex: request.query.keyword,
    $options :'i' 
  }} : {}

  const products = await ProductModel.find(query);
  response.json({
    success: true,
    message: "Get Products Working!!!",
    products,
  });
};

// Get Single Product API = /api/v1/product/:id
exports.getSingleProduct = async (request, response, next) => {
  try {
    console.log(request.params.id, "ID");
    const product = await ProductModel.findById(request.params.id);

    response.json({
      success: true,
      message: "Get single Product Working!!!",
      product,
    });
  } catch (error) {
    console.error(error);
    response
      .status(404)
      .json({ success: false, message: "Server Error, data not found" });
  }
};
