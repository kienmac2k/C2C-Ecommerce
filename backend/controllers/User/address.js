const AddressDto = require("../../dtos/responses/address.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const { Addresses } = require("../../models");
const _ = require("lodash");

// get all addresses
exports.getAddresses = function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.page_size) || 5;
  const offset = (page - 1) * pageSize;

  Addresses.findAndCountAll({
    where: { userId: req.user.id },
    offset,
    limit: pageSize,
  })
    .then(function (addresses) {
      return res.json(
        AddressDto.buildPagedList(
          addresses.rows,
          page,
          pageSize,
          addresses.count,
          req.baseUrl
        )
      );
    })
    .catch((err) => {
      return res.json(AppResponseDto.buildWithErrorMessages(err));
    });
};

// create address
exports.createAddress = function (req, res, next) {
  const errors = {};

  const firstName = req.body.firstName || req.user.firstName;
  const lastName = req.body.lastName || req.user.lastName;
  const zipCode = req.body.zipCode;
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;
  const mobile = req.body.mobile;

  if (!city || city.trim() === "") errors.firstName = "city is required";
  if (!mobile || mobile.trim() === "") errors.mobile = "mobile is required";

  if (!country || country.trim() === "")
    errors.lastName = "country is required";

  if (!zipCode || zipCode.trim() === "") errors.email = "zipCode is required";

  if (!address || address.trim() === "")
    errors.password = "Password must not be empty";

  if (!_.isEmpty(errors)) {
    // return res.status(422).json({success: false, errors});
    return res.status(422).json(AppResponseDto.buildWithErrorMessages(errors));
  }

  new Addresses({
    firstName: firstName,
    lastName: lastName,
    city,
    country,
    address,
    zipCode,
    mobile,
    user: req.user,
  })
    .save()
    .then((address) => {
      return res.json(
        AppResponseDto.buildWithDtoAndMessages(
          AddressDto.buildDto(address),
          "Address addedd successfully"
        )
      );
    })
    .catch((err) => {
      return res.json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

// get address of a user

exports.getAddressById = function (req, res, next) {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  Addresses.findOne({
    where: { userId, id: addressId },
  })
    .then((address) => {
      return res
        .status(200)
        .json(
          AppResponseDto.buildWithDtoAndMessages(
            AddressDto.buildDto(address),
            "Address found"
          )
        );
    })
    .catch((err) => {
      return res.json(AppResponseDto.buildWithErrorMessages(err));
    });
};
// edit address of a user
exports.updateAddress = function (req, res, next) {
  Addresses.findOne({
    where: { id: req.params.addressId, userId: req.user.id },
  })
    .then((address) => {
      const addressData = {
        firstName: req.body.firstName || address.firstName,
        lastName: req.body.lastName || address.lastName,
        city: req.body.city || address.city,
        address: req.body.address || address.address,
        zipCode: req.body.zipCode || address.zipCode,
        mobile: req.body.mobile || address.mobile,
      };

      address
        .update(addressData)
        .then(() =>
          res
            .status(200)
            .json(
              AppResponseDto.buildSuccessWithMessages(
                "Address updated successfully"
              )
            )
        )
        .catch((error) => {
          console.error("Error on update: ", error);
          return res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      console.error("Error on finding address: ", err);
      return res.status(400).send({ error: err.message });
    });
};

exports.deleteAddress = function (req, res) {
  Addresses.findOne({
    where: { id: req.params.addressId, userId: req.user.id },
  })
    .then((address) => {
      address
        .destroy()
        .then(() => {
          return res
            .status(200)
            .json(
              AppResponseDto.buildSuccessWithMessages(
                "Address deleted successfully"
              )
            );
        })
        .catch((err) => {
          console.error("Error on delete address: ", err);
          return res
            .status(400)
            .json(AppResponseDto.buildWithErrorMessages(err));
        });
    })
    .catch((err) => {
      console.error("Error on finding  address: ", err);
      return res.status(400).json(AppResponseDto.buildWithErrorMessages(err));
    });
};
