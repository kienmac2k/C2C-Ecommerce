const CommentResponseDto = require("../../dtos/responses/comments.dto");
const CommentRequestDto = require("../../dtos/requests/comments.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const { Comments } = require("../../models");
const _ = require("lodash");
exports.createComment = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }

  const bindingResult = CommentRequestDto.createCommentDto(req.body);
  if (!_.isEmpty(bindingResult.errors)) {
  }

  Comments.create({
    productId: req.body.productId,
    userId: req.user.id,
    content: req.body.content,
    rating: req.body.rating,
  })
    .then((comment) => {
      return res.json(CommentResponseDto.buildDetails(comment, false, false));
    })
    .catch((err) => {
      return res.json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.deleteComment = function (req, res, next) {
  if (!req.user || req.user.is_admin === false) {
    return res.status(403).send({ error: "Not authorized." });
  }
  Comments.findOne({
    where: { id: req.params.commentId, userId: req.user.id },
  }).then((comment) => {
    comment
      .destroy()
      .then((result) => {
        return res.json(
          AppResponseDto.buildSuccessWithMessages(
            "comment removed successfully"
          )
        );
      })
      .catch((err) => {
        return res.json(
          AppResponseDto.buildWithErrorMessages("This is not your comment")
        );
      });
  });
};
