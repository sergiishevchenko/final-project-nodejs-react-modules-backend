import Areas from "../db/models/Areas.js";

const getAreas = () => {
  return Areas.findAll();
};

export default getAreas;
