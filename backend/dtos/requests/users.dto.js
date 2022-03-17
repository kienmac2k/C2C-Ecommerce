const sanitizeInput = require("../../util/sanitize").sanitizeInput;
exports.createUserRequestDto = (body) => {
  const resultBinding = {
    validatedData: {},
    errors: {},
  };

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!body.name || body.name.trim() === "")
    resultBinding.errors.name = "Username is required";
  else resultBinding.validatedData.name = sanitizeInput(body.name);

  if (
    body.email &&
    body.email.trim() !== "" &&
    emailRegex.test(String(body.email).toLowerCase())
  )
    resultBinding.validatedData.email = sanitizeInput(body.email.toLowerCase());
  else resultBinding.errors.email = "Email is required";
  if (body.password && body.password.trim() !== "")
    resultBinding.validatedData.password = body.password;
  else resultBinding.errors.password = "Password must not be empty";

  return resultBinding;
};
