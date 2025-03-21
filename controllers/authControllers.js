import { addUser, loginUser, logoutUser, updateUserAvatar } from "../services/authServices.js";
import fs from "node:fs/promises";
import cloudinary from "../helpers/cloudinary.js";
import HttpError from "../helpers/HttpError.js";
import { followUser, unfollowUser } from "../services/usersServices.js";

/**
 * Реєстрація користувача
 */
export const register = async (req, res) => {
    const result = await addUser(req.body);

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    });
};

/**
 * Логін користувача
 */
export const login = async (req, res) => {
    const result = await loginUser(req.body);

    res.json({
        token: result.token,
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    });
};

/**
 * Логаут користувача
 */
export const logout = async (req, res) => {
    const { id } = req.user;
    await logoutUser({ id });

    res.status(204).json({
        message: "No Content"
    });
};

/**
 * Оновлення аватарки
 */
export const updateAvatar = async (req, res) => {
    const { email } = req.user;
    if (!req.file) {
        throw HttpError(400, "No file to upload");
    }

    const { url } = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
        use_filename: true,
    });

    const avatar = url;
    await fs.unlink(req.file.path);

    const result = await updateUserAvatar({ email }, avatar);

    res.json({
        avatar: result.avatar
    });
};

/**
 * Функція для підписки на користувача
 */
export const follow = async (req, res) => {
    const followerId = req.user.id;
    const { userId } = req.body;

    const result = await followUser(followerId, userId);
    res.status(200).json(result);
}

export const unfollow = async (req, res) => {
    const followerId = req.user.id;
    const { userId } = req.body;

    const result = await unfollowUser(followerId, userId);
    res.status(200).json(result);
}

