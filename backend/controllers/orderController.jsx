const orderModel = require('../models/orderModel.jsx');

// Create Order - /api/v1/order
exports.createOrder = async(request, response, next) => {
  
  console.log(request.body, 'DATA');

  const cartItems = request.body;
  const amount =Number(cartItems.reduce((accumulator, item) => (accumulator + item.product.price * item.qty), 0)).toFixed(2);
  console.log(amount, 'total amount');
  const status = "Pending";

  const order = await orderModel.create({cartItems, amount, status})
  
  response.json({
    success: true,
    message: "Order works successfully!!!",
    order,
  });
};
