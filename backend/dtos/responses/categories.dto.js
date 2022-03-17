const PageMetaDto = require("./page_meta.dto");

function buildPagedList(tags, page, pageSize, totalProductsCount, basePath) {
  return {
    success: true,
    page_meta: PageMetaDto.build(
      tags.length,
      page,
      pageSize,
      totalProductsCount,
      basePath
    ),
    ...buildDtos(tags),
  };
}

function buildDtos(categories) {
  if (!categories) return { categories: [] };
  return {
    categories: categories.map((category) => buildDto(category, true)),
  };
}

function buildDto(category) {
  const summary = {
    id: category.id,
    parentId: category.parentId,
    name: category.name,
    description: category.description,
    img: category.img,
    slug: category.slug,
    order: category.order,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };

  return summary;
}

module.exports = {
  buildDtos,
  buildPagedList,
  buildDto,
};
