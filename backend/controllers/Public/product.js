const _ = require("lodash");

const {
  sequelize,
  Sequelize,
  Products,
  Categories,
  Users,
  Comments,
  Shops,
  Product_Images,
} = require("../../models");

const AppResponseDto = require("../../dtos/responses/app_response.dto");
const ProductRequestDto = require("../../dtos/requests/products.dto");
const ProductResponseDto = require("../../dtos/responses/products.dto");

// Get all products
exports.getAll = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;

  Promise.all([
    Products.findAll({
      offset: 0,
      limit: 5,
      order: [
        ["createdAt", "DESC"],
        // ['price', 'DESC']
      ],
      // [Comment, 'createdAt', 'DESC'],

      attributes: [
        "id",
        "name",
        "coverImg",
        "price",
        "description",
        "createdAt",
        "updatedAt",
        // ['publish_on', 'created_at'],
        // [sequelize.fn('count', sequelize.col('comments.id')), 'commentsCount']
        // [sequelize.fn('COUNT', sequelize.col('id')), 'productsCount'] // instance.get('productsCount')
      ], // retrieve publish_on column and report it as created_at javascript attribute
      // or
      // attributes: { include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']] }

      // attributes: {exclude: ['description']},
      include: [
        {
          model: Categories,
          attributes: ["id", "name", "slug"],
          as: "categories",
        },
      ],
      // group: ['products.id'],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    }),
    Products.findAndCountAll({ attributes: ["id"] }),
  ])
    .then((results) => {
      const products = results[0];
      const productsCount = results[1].count;
      Comments.findAll({
        where: {
          productId: {
            [Sequelize.Op.in]: products.map((product) => product.id),
          },
        },
        attributes: [
          "productId",
          [Sequelize.fn("COUNT", Sequelize.col("id")), "commentsCount"],
        ],
        group: "productId",
      })
        .then((results) => {
          products.forEach((product) => {
            let comment = results.find(
              (comment) => product.id === comment.productId
            );
            if (comment != null)
              product.comments_count = comment.get("commentsCount");
            else product.comments_count = 0;
          });
          return res
            .status(200)
            .json(
              ProductResponseDto.buildPagedList(
                products,
                page,
                pageSize,
                productsCount,
                req.baseUrl
              )
            );
        })
        .catch((err) => {
          res
            .status(500)
            .json(AppResponseDto.buildWithErrorMessages(err.message));
        });
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
};

// Get products by id
exports.getById = function (req, res, next) {
  Products.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Categories,
        attributes: ["id", "name"],
        as: "categories",
      },
      {
        model: Comments,
        as: "comments",
        attributes: ["id", "content"],
        include: [{ model: Users, as: "user", attributes: ["id", "name"] }],
      },
    ],
  })
    .then((product) => {
      return res
        .status(200)
        .json(ProductResponseDto.buildDetails(product, true, false));
    })
    .catch((err) => {
      return res
        .status(400)
        .json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

// search products
exports.searchProduct = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;
  console.log(
    "🚀 ~ file: product.js ~ line 145 ~ req.query.slug",
    req.query.slug
  );

  Products.findAndCountAll({
    where: {
      slug: { [Sequelize.Op.like]: "%" + req.query.slug + "%" },
    },
    offset,
    limit: pageSize,
  })
    .then((products) => {
      return res
        .status(200)
        .json(
          ProductResponseDto.buildPagedList(
            products.rows,
            page,
            pageSize,
            products.count,
            req.baseUrl
          )
        );
    })
    .catch((err) => {
      return res
        .status(500)
        .json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

// exports.getByTag = function (req, res, next) {
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = parseInt(req.query.pageSize) || 5;
//   const offset = (page - 1) * pageSize;
//   const limit = pageSize;
//   ProductTag.findAll({
//     where: { tagId: req.tagId },
//     attributes: ["productId"],
//     order: [["createdAt", "DESC"]],
//   })
//     .then((pts) => {
//       let productIds = pts.map((pt) => pt.productId);
//       const productsCount = pts.length;
//       productIds = _.slice(productIds, offset, offset + limit);
//       Promise.all([
//         Product.findAll({
//           attributes: ["id", "name", "slug", "created_at", "updated_at"],
//           where: {
//             id: {
//               [sequelize.Op.in]: productIds,
//             },
//           },
//           include: [Tag, Category],
//         }),
//         Comment.findAll({
//           where: {
//             productId: {
//               [sequelize.Op.in]: productIds,
//             },
//           },
//           attributes: [
//             "id",
//             "productId",
//             [sequelize.fn("count", sequelize.col("id")), "commentsCount"],
//           ],
//           // instance.get('productsCount')
//           group: "productId",
//         }),
//       ])
//         .then((results) => {
//           const products = results[0];
//           const comments = results[1];

//           products.forEach((product) => {
//             let comment = comments.find(
//               (comment) => product.id === comment.productId
//             );
//             if (comment != null)
//               product.comments_count = comment.get("commentsCount");
//             else product.comments_count = 0;
//           });

//           return res.json(
//             ProductResponseDto.buildPagedList(
//               products,
//               page,
//               pageSize,
//               productsCount,
//               req.baseUrl
//             )
//           );
//         })
//         .catch((err) => {
//           return res.json(AppResponseDto.buildWithErrorMessages(err.message));
//         });
//     })
//     .catch((err) => {
//       return res.json(AppResponseDto.buildWithErrorMessages(err.message));
//     });
// };

//get products by category

exports.getByCategory = function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;

  const categoryQuery = {};
  if (!!req.params.category_slug) categoryQuery.slug = req.params.category_slug;
  else categoryQuery.id = req.params.id;

  Products.findAndCountAll({
    include: [
      {
        model: Categories,
        where: categoryQuery,
        as: "categories",

        // through: {attributes: ['id'],}
      },
      {
        model: Shops,
        as: "shop",
        attributes: ["name"],
      },

      {
        model: Comments,
        as: "comments",

        attributes: ["id", "productId"],
        group: "productId",
      },
    ],

    order: [
      ["createdAt", "DESC"],
      // ['price', 'DESC']
    ],

    offset,
    limit: pageSize,
  })
    .then((products) => {
      return res
        .status(200)
        .json(
          ProductResponseDto.buildPagedList(
            products.rows,
            page,
            pageSize,
            products.count,
            req.baseUrl
          )
        );
    })
    .catch((err) => {
      return res
        .status(500)
        .json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.getByShop = function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;
  const shopQuery = {};
  shopQuery.id = req.params.id;

  Products.findAndCountAll({
    include: [
      {
        model: Shops,
        where: shopQuery,
        as: "shop",

        // through: {attributes: ['id'],}
      },

      {
        model: Comments,
        as: "comments",
        attributes: ["id", "productId"],
        group: "productId",
      },
    ],

    order: [["createdAt", "DESC"]],

    offset,
    limit: pageSize,
  })
    .then((products) => {
      return res
        .status(200)
        .json(
          ProductResponseDto.buildPagedList(
            products.rows,
            page,
            pageSize,
            products.count,
            req.baseUrl
          )
        );
    })
    .catch((err) => {
      return res
        .status(500)
        .json(AppResponseDto.buildWithErrorMessages(err.message));
    });
};
