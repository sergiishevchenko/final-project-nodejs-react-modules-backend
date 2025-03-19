import ctrlWrapper from "../helpers/ctrlWrapper.js";
import getAreas from "../services/areasServices.js";

const getAllAreas = async (req, res) => {
  const result = await getAreas();
  res.json(result);
};

export default ctrlWrapper(getAllAreas);
