import { getProfileFollowers } from '../services/profileFollowersServices.js';

const getFollowersForProfile = async (req, res) => {
  const userId = req.user.id;
  const { page, limit } = req.query;

  const result = await getProfileFollowers({ userId, page, limit });
  res.json(result);
};

export default getFollowersForProfile;
