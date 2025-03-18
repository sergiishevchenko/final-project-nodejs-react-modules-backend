import Users from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

const { JWT_SECRET } = process.env;

export const findUser = query => Users.findOne({
    where: query,
}); 

export const addUser = async data => {
    const { email, password } = data;
    const user = await findUser({email});
    if (user) {
        throw HttpError(409, "Email in use");
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);

    const newUser = await Users.create({ ...data, password: hashedPassword, avatar});
    return newUser;
};

export const loginUser = async data => {
    const { email, password } = data;
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw HttpError(401, "Email or password is wrong");
    };

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
    return user.update({ token }, {
        returning: true,
    })
};

export const logoutUser = async id => {
    const user = await findUser(id);
    if (!user) {
        throw HttpError(401, "Not authorized");
    };

    return user.update({ token: null }, {
        returning: true,
    });
};

export const getUser = async email => {
    const user = findUser(email);
    if (!user) {
        throw HttpError(401, "Not authorized");
    };

    return user;
};
