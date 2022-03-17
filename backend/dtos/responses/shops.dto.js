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

function buildDtos(shops) {
  if (!shops) return { shops: [] };
  return {
    shops: shops.map((shop) => buildDto(shop, true)),
  };
}

function buildDto(shop) {
  const summary = {
    id: shop.id,
    name: shop.name,
    isActive: shop.isActive,
    description: shop.description,
    address: shop.address,
    mobile: shop.mobile,
    email: shop.email,
  };

  return summary;
}

module.exports = {
  buildDtos,
  buildPagedList,
  buildDto,
};
