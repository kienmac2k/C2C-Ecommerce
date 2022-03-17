const { sanitizeInput } = require("../../util/sanitize");

exports.createCommentDto = (input) => {
  const resultBinding = {
    validatedData: {},
    errors: {},
  };

  if (input.content && input.content.trim() !== "")
    resultBinding.errors.content = "a content for your comment is required";
  else resultBinding.validatedData.email = sanitizeInput(input.content);

  return resultBinding;
};
