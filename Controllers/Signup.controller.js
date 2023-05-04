/**
 * SIGNUP CONTROLLER:
 * 1. FOR COLLECTING ALL SUB ROUTES RELATED TO SIGNUP FUNCTIONALITY
 * 2. HAS ALL SIGNUP FUNCTIONALITY
 * 3. HAS PASSWORD RESET FUNCTIONALITY
 */
const signuprouter = require("express").Router();
const SignupModel = require("../Models/signup");
const { hashString } = require("../Utils/AuthUtils");

/**
 * CREATE A NEW ACCOUNT
 * METHOD = POST
 * PATH = /createAccount
 * INPUT = { userName: string, userEmailId: string, phoneNumber: string, password: string }
 */
signuprouter.post("/", async (request, response, next) => {
  const { userName, userEmailId, phoneNumber, password } = request.body;
  const hashedPassword = await hashString(password, 5);
  /**
   * CHECKING WHETHER USER ALREADY HAVE ACCOUNT WITH US
   */

  const userExistingData = await SignupModel.findOne({
    userEmailId: userEmailId,
    phoneNumber: phoneNumber,
  });
  if (userExistingData?._id) {
    return response.status(409).json({
      success: false,
      message: "User account already exists",
    });
  } else {
    //CONSTRUCTING NEW SIGNUP OBJECT
    const newUser = new SignupModel({
      userName: userName,
      userEmailId: userEmailId,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });
    // TRYING TO SAVE USER IN DATABASE
    newUser
      .save()
      .then((res) => {
        if (res._id) {
          response.status(200).json({
            success: true,
            message: "Account created successfully!!!",
            data: res,
          });
        } else {
          response.status(500).json({
            success: false,
            message: "Something went wrong internally!!!",
            data: res,
          });
        }
      })
      .catch((error) => {
        return response.status(400).json({
          success: false,
          message: "Bad Request!!!",
          error: error,
        });
      });
  }
});

module.exports = signuprouter;
