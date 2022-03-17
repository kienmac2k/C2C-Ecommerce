const CommentResponseDto = require("../../dtos/responses/comments.dto");
const AppResponseDto = require("../../dtos/responses/app_response.dto");
const { Users, Comments } = require("../../models");

exports.getCommentsFromProduct = function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;

  return Comments.findAndCountAll({
    where: { productId: req.params.productId },
    attributes: ["content"],
    offset,
    limit: pageSize,
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["id", "name"],
      },
    ],
  })
    .then(function (comments) {
      const commentsCount = comments.count;
      return res.json(
        CommentResponseDto.buildPagedList(
          comments.rows,
          page,
          pageSize,
          commentsCount,
          req.baseUrl,
          true
        )
      );
    })
    .catch((err) => {
      return res.json(AppResponseDto.buildSuccessWithMessages(err.message));
    });
};
