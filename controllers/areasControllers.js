import ctrlWrapper from "../helpers/ctrlWrapper.js";
import getAreas from "../services/areasServices.js";

const getAllAreas = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await getAreas({}, { page, limit });
  res.json(result);
};

export default ctrlWrapper(getAllAreas);