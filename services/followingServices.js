import UserFollower from '../db/models/UserFollower.js';
import Users from '../db/models/Users.js';
import getPagination from '../helpers/getPagination.js';

// Налаштування асоціації для отримання даних про користувача, на якого підписані. Можливо пізніше варто винести окремо.
UserFollower.belongsTo(Users, { foreignKey: 'userId', as: 'followedUser' });

export const getFollowing = async ({ followerId, page = 1, limit: size = 10 }) => {
  const { limit, offset } = getPagination(page, size);

  const { count, rows } = await UserFollower.findAndCountAll({
    where: { followerId },
    include: [
      {
        model: Users,
        as: 'followedUser',
        attributes: ['id', 'email', 'name', 'avatar'],
      },
    ],
    limit,
    offset,
  });

  // Якщо користувач не підписаний ні на кого, rows буде порожнім.
  const following = rows.map(record => record.followedUser);

  return {
    totalItems: count,
    following,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
  };
};
