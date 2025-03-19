import { getUserById } from '../services/usersServices.js';

export const getUser = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        throw new HttpError(401, 'Unauthorized');
    }

    const result = await getUserById({ id });

    res.json(result);
};
