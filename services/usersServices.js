import Users from '../db/models/Users.js';
import UserFollower from "../db/models/UserFollower.js";
import HttpError from '../helpers/HttpError.js';

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