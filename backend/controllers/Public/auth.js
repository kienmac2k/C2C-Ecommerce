const _ = require("lodash");
const { Users, Roles } = require("../../models");
const UserResponseDto = require("../../dtos/responses/users.dto");
const UserRequestDto = require("../../dtos/requests/users.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const { Op } = require("sequelize");

const signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // if no email or password then send
  if (!email || !password) {
    res.status(400).send({ error: "You need a email and password" });
    return;
  }

  // check 1: lookup the user if it already exists
  // check2: compare passwords
  Users.findOne({
    where: {
      [Op.or]: [{ email }, { name: email }],
    },
    include: [
      {
        model: Roles,
        as: "roles",
        attributes: ["displayName"],
        through: { attributes: [] },
      },
    ],
  })
    .then(function (user) {
      if (user && user.isValidPassword(password)) {
        return res.status(200).json(UserResponseDto.loginSuccess(user));
      } else return res.status(401).json(AppResponseDto.buildWithErrorMessages("Invalid credentials"));
    })
    .catch((err) => {
      res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
};

const signup = (req, res) => {
  const body = req.body;
  const resultBinding = UserRequestDto.createUserRequestDto(body);
  if (!_.isEmpty(resultBinding.errors)) {
    return res
      .status(422)
      .json(AppResponseDto.buildWithErrorMessages(resultBinding.errors));
  }

  const email = resultBinding.validatedData.email;
  const name = resultBinding.validatedData.name;

  Users.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
    },
  })
    .then((user) => {
      if (user) {
        const errors = {};
        // If the user exists, return Error
        if (user.name === body.name)
          errors.name = "username: " + body.name + " is already taken";

        if (user.email === body.email)
          errors.email = "Email: " + body.email + " is already taken";

        if (!_.isEmpty(errors)) {
          return res
            .status(403)
            .json(AppResponseDto.buildWithErrorMessages(errors));
        }
      }

      Users.create(resultBinding.validatedData)
        .then((user) => {
          if (user === null) {
            throw user;
          }
          if (user) {
            res.json(UserResponseDto.registerDto(user));
          } else console.log("user is empty ...???");
        })
        .catch((err) => {
          return res
            .status(400)
            .send(AppResponseDto.buildWithErrorMessages(err));
        });
    })
    .catch((err) => {
      return res.status(400).send(AppResponseDto.buildWithErrorMessages(err));
    });
};

//Forgot password

// Reset password

// const google = (req, res)=>{
//     if(req.user.error)
//         return res.json({
//             success: false,
//             message: req.user.error.message
//         })

//     let user = req.user
//     const token = jwt.sign({ id: user._id, userType: 3 }, config.jwt.SECRET, { expiresIn: config.jwt.EXPIRY })

//     User.findById(user._id)
//     .populate("wishlist cart.product", "name shortname discount price image")
//     .then(user=>{
//         return res.json({
//             success: true,
//             message: "Successfully signedin",
//             token: token,
//             data: {
//                 profileDetails: user.profileDetails,
//                 shippingAddress: user.shippingAddress,
//                 wishlist: user.wishlist,
//                 cart: user.cart
//             }
//         })
//     })
// }

// const googleToken = (req, res)=>{
//     if(req.error)
//         return res.json({
//             success: false,
//             message: "Failed to sign in",
//             error: req.error
//         })
//     if(req.user.error)
//         return res.json({
//             success: false,
//             message: req.user.error.message
//         })

//     let user = req.user
//     const token = jwt.sign({ id: user._id, userType: 3 }, config.jwt.SECRET, { expiresIn: config.jwt.EXPIRY })

//     if(req.user.error)
//         return res.json({
//             success: false,
//             message: req.user.error.message
//         })

//     User.findById(user._id)
//     .populate("wishlist cart.product", "name shortname discount price image")
//     .then(user=>{
//         return res.json({
//             success: true,
//             message: "Successfully signedin",
//             token: token,
//             data: {
//                 profileDetails: user.profileDetails,
//                 shippingAddress: user.shippingAddress,
//                 wishlist: user.wishlist,
//                 cart: user.cart
//             }
//         })
//     })
// }

// const facebook = (req, res)=>{
//     if(req.user.error)
//         return res.json({
//             success: false,
//             message: req.user.error.message
//         })

//     let user = req.user
//     const token = jwt.sign({ id: user._id, userType: 3 }, config.jwt.SECRET, { expiresIn: config.jwt.EXPIRY })

//     User.findById(user._id)
//     .populate("wishlist cart.product", "name shortname discount price image")
//     .then(user=>{
//         return res.json({
//             success: true,
//             message: "Successfully signedin",
//             token: token,
//             data: {
//                 profileDetails: user.profileDetails,
//                 shippingAddress: user.shippingAddress,
//                 wishlist: user.wishlist,
//                 cart: user.cart
//             }
//         })
//     })
// }

// const facebookToken = (req, res)=>{
//     if(req.error)
//         return res.json({
//             success: false,
//             message: "Failed to sign in",
//             error: req.error
//         })

//     let user = req.user
//     const token = jwt.sign({ id: user._id, userType: 3 }, config.jwt.SECRET, { expiresIn: config.jwt.EXPIRY })

//     User.findById(user._id)
//     .populate("wishlist cart.product", "name shortname discount price image")
//     .then(user=>{
//         return res.json({
//             success: true,
//             message: "Successfully signedin",
//             token: token,
//             data: {
//                 profileDetails: user.profileDetails,
//                 shippingAddress: user.shippingAddress,
//                 wishlist: user.wishlist,
//                 cart: user.cart
//             }
//         })
//     })
// }

module.exports = {
  signin,
  signup,
};
