const RestaurantsRouter = require("express").Router();

RestaurantsRouter.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Restaurants fetched successfully!!!",
  });
});

module.exports = RestaurantsRouter;
