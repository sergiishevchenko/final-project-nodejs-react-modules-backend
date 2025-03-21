import { getFollowing } from '../services/followingServices.js';

const getFollowingUsers = async (req, res) => {
  const followerId = req.user.id;
  const { page, limit } = req.query;
  
  const result = await getFollowing({ followerId, page, limit });
  res.json(result);
};

export default getFollowingUsers;
