const { Users } = require("../../models");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const UserResponseDto = require("../../dtos/responses/users.dto");
exports.getProfile = function (req, res, next) {
  Users.findOne({
    where: { id: req.user.id },
  })
    .then((user) => {
      return res
        .status(200)
        .json(UserResponseDto.buildOnlyForIdAndUsername(user));
    })
    .catch((err) => {
      return res
        .status(400)
        .json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};
