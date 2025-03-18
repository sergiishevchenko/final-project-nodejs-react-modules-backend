import Areas from "../db/models/Areas.js";

const getAreas = (query = {}, pagination = {}) => {
  const { page = 1, limit = 10 } = pagination;
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;
  return Areas.findAll({ where: query, offset, limit: normalizedLimit });
};

export default getAreas;
