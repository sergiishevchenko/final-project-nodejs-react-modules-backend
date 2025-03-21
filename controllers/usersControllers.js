import {
    getUserById,
    getCurrentUserDetails,
    getUserDetailsById,
    getFollowing,
    getProfileFollowers,
    getFollowers,
} from '../services/usersServices.js';

export const getUser = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        throw new HttpError(401, 'Unauthorized');
    }

    const result = await getUserById({ id });

    res.json(result);
};

export const getUserDetails = async (req, res) => {
    const { id: requestedUserId } = req.params;
    const { id: currentUserId } = req.user

    if (+requestedUserId === currentUserId) {
        const result = await getCurrentUserDetails({ id: currentUserId });

        res.json(result);

        return;
    }

    const result = await getUserDetailsById({ id: requestedUserId });

    res.json(result);
}

export const getFollowingUsers = async (req, res) => {
  const followerId = req.user.id;
  const { page, limit } = req.query;
  
  const result = await getFollowing({ followerId, page, limit });
  res.json(result);
};

export const getFollowersForProfile = async (req, res) => {
  const userId = req.user.id;
  const { page, limit } = req.query;

  const result = await getProfileFollowers({ userId, page, limit });
  res.json(result);
};

export const getFollowersByUserId = async (req, res) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  
  const result = await getFollowers({ userId: id, page, limit });
  res.json(result);
};