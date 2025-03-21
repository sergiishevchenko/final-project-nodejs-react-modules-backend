import { getFollowers } from '../services/followersServices.js';

const getFollowersByUserId = async (req, res) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  
  const result = await getFollowers({ userId: id, page, limit });
  res.json(result);
};

export default getFollowersByUserId;
