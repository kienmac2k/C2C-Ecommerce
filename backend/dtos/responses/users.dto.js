const RolesDto = require("./roles.dto");

function registerDto() {
  return {
    success: true,
    full_messages: ["User registered successfully"],
  };
}

function loginSuccess(user) {
  const token = user.generateJwt();
  return {
    success: true,
    token,
    user: {
      name: user.name,
      roles: RolesDto.toNameList(user.roles || []),
    },
  };
}

function buildOnlyForIdAndUsername(user) {
  if (user == null) return {};
  return {
    id: user.id,
    name: user.name,
  };
}

module.exports = {
  registerDto,
  loginSuccess,
  buildOnlyForIdAndUsername,
};
