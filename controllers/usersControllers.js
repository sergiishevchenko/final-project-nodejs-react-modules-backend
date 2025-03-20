import {
    getUserById,
    getCurrentUserDetails,
    getUserDetailsById,
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
