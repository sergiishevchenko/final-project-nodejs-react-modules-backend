import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePreffix}_${file.originalname}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const extention = file.originalname.split(".").pop();
    if (extention === "exe") {
        return cb(HttpError(400, ".exe file not allow"));
    };

    cb(null, true);
};

const uploadAvatar = multer({
    storage,
    fileFilter,
});

export default uploadAvatar;
