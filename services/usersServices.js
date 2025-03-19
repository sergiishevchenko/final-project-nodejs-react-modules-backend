import Users from '../db/models/Users.js';
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
