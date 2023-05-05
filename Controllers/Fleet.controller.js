const FleetRouter = require("express").Router();
const { blockIfUser } = require("../Middleware/Authorization.middleware");

FleetRouter.get("/", blockIfUser, (req, res, next) => {
  return res.status(200).json({
    message: "Fleets fetched successfully!!!",
  });
});

module.exports = FleetRouter;
