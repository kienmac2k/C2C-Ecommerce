function onlyName(role) {
  return { name: role.get("name") };
}

function toNameList(roles) {
  if (roles == null) return [];
  return roles.map((r) => r.displayName);
}

module.exports = {
  onlyName,
  toNameList,
};
