import Users from '../db/models/Users.js';
import UserFollower from "../db/models/UserFollower.js";
import HttpError from '../helpers/HttpError.js';
import Recipes from '../db/models/Recipes.js';
import getPagination from '../helpers/getPagination.js';

const findUser = (query) =>
    Users.findOne({
        where: query,
    });

export const getUserById = async ({ id }) => {
    const user = await findUser({ id });

    if (!user) {
        throw HttpError(404, 'Not found');
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
    };
};

export const getCurrentUserDetails = async ({id }) => {
  const user = await findUser({ id });

  if (!user) {
      throw HttpError(404, 'Not found');
  }

  const recipesCount = await Recipes.count({ where: { ownerId: id } });
  const followersCount = await UserFollower.count({ where: { userId: id } });
  const followingCount = await UserFollower.count({ where: { followerId: id } });
  
   return {
       id: user.id,
       email: user.email,
       name: user.name,
       avatar: user.avatar,
       recipesCount,
       favoriteRecipesCount: 0, // TODO implement when favorite recipes will be available
       followersCount, 
       followingCount,
   };
}


export const getUserDetailsById = async ({ id }) => {
    const user = await findUser({ id });

    if (!user) {
        throw HttpError(404, 'Not found');
    }

    const recipesCount = await Recipes.count({ where: { ownerId: id } });
    const followersCount = await UserFollower.count({ where: { userId: id } });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        recipesCount,
        followersCount,
    };
};

export const followUser = async (followerId, userId) => {
    if (followerId === userId) {
        throw HttpError(400, "You cannot follow yourself");
    }

    const follower = await Users.findByPk(followerId);

    if (!follower) {
        throw HttpError(400, "Follower not found");
    }

    const user = await Users.findByPk(userId);

    if (!user) {
        throw HttpError(400, "Following user not found");
    }

    // Перевіряємо, чи вже є підписка
    const existingFollow = await UserFollower.findOne({
        where: { followerId, userId },
    });

    if (existingFollow) {
        return { message: 'Already following this user' };
    }

    await UserFollower.create({ followerId, userId });

    return { message: 'Successfully followed the user' };
}

export const unfollowUser = async (followerId, userId) => {
    const existingFollow = await UserFollower.findOne({
        where: { followerId, userId },
    });

    if (!existingFollow) {
        return { message: 'Already unfollow this user' };
    }

    await existingFollow.destroy();

    return { message: 'Successfully unfollowed the user' };
}

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

export const getProfileFollowers = async ({ userId, page = 1, limit: size = 10 }) => {
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

  // Якщо підписників немає, rows буде порожнім.
  const followers = rows.map(record => record.follower);

  return {
    totalItems: count,
    followers,
    totalPages: Math.ceil(count / limit),
    currentPage: +page,
  };
};

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
