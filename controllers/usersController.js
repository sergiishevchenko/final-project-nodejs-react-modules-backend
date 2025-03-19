import { followUser } from "../services/usersService.js";

export const follow = async (req, res) => {
    const followerId = req.user.id;
    const { userId } = req.body;

    const result = await followUser(followerId, userId);
    res.status(200).json(result);
}