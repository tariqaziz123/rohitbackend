const express = require("express");

const route = express.Router();

const locationController = require("../Controllers/locations");
const mealTypeController = require("../Controllers/Mealtype");
const restaurantController = require('../Controllers/restaurants');
const menuController = require('../Controllers/menuitems');
const paymentController = require('../Controllers/payment');
const userController = require('../Controllers/user');
const orders =require('../Controllers/order');


route.get('/location',locationController.getLocation);
route.get('/mealtype',mealTypeController.getMealtype);
route.get('/restaurants/:locationId',restaurantController.getRestaurantsByLocations);
route.post('/filter',restaurantController.filteredRestaurants);
route.get('/restaurant/:resId',restaurantController.getRestaurantDetailsById);
route.get('/menuitems/:resId',menuController.getMenuItemsByRestaurent);
route.post('/payment',paymentController.payment);
route.post('/callback', paymentController.callback);
route.post('/login',userController.login);
route.post('/signup',userController.signUp);
route.post('/orders',orders.myOrder);

module.exports=route;