import UserFollower from '../db/models/UserFollower.js';
import Users from '../db/models/Users.js';
import getPagination from '../helpers/getPagination.js';

// Додаємо асоціацію для отримання даних користувача, який підписався. Можливо треба буде винести окремо.
UserFollower.belongsTo(Users, { foreignKey: 'followerId', as: 'follower' });

export const getFollowers = async ({ userId, page = 1, limit: size = 10 }) => {
  const { limit, offset } = getPagination(page, size);

  const { count, rows } = await UserFollower.findAndCountAll({
    where: { userId },
    include: [
      {
        model: Users,
        as: 'follower',
        attributes: ['id', 'email', 'name', 'avatar'],
      },
    ],
    limit,
    offset,
  });

  const followers = rows.map(record => record.follower);
  return {
    totalItems: count,
    followers,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
  };
};
