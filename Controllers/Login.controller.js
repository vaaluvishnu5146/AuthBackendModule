/**
 * LOGIN CONMTROLLER:
 * 1. FOR COLLCTING ALL SUB ROUTES RELATED TRO LOGIN FUNCTIONALITY
 * 2. HAS ALL LOGIN FUNCTIONALITY
 */
const loginrouter = require("express").Router();
const SignupModel = require("../Models/signup");
const { compareStrings, generateJSONToken } = require("../Utils/AuthUtils");

/**
 * LOGIN USER
 * METHOD = POST
 * PATH = /login
 */
loginrouter.post("/", async (request, response, next) => {
  const { userEmailId, password } = request.body;
  const userExistingData = await SignupModel.findOne({
    userEmailId: userEmailId,
  });
  if (userExistingData?._id) {
    const match = await compareStrings(password, userExistingData.password);
    if (match) {
      //GET OTP FROM OTP GENERATOR -> GIVE US OTP -> SEND OTP -> SAME WE WILL STORE IN USER RECENT OTP
      return response.status(200).json({
        success: true,
        token: await generateJSONToken({
          name: userExistingData?.userName,
          role: "user",
        }),
        message: "Logged in successfully!!!",
      });
    } else {
      return response.status(400).json({
        success: false,
        message: "EmailId or Password is In-correct!!!",
      });
    }
  } else {
    return response.status(400).json({
      success: false,
      message: "User account doesnt exists, create new account!!!",
    });
  }
});

// FORGOT password
//STEP 1: VALIDATE USER -> userEmailID -> url
//STEP 2: IF USER HAS ACCOUNT SEND URL TO USER
//STEP 3: IF NO UISER SEND CREATE ACCOUNT MESSAGE
// password@123

module.exports = loginrouter;
