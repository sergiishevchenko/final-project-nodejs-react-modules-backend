import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const extension = file.originalname.split(".").pop();
    if (extension === "exe") {
        return cb(HttpError(400, ".exe file not allowed"));
    }

    const allowedTypes = ["jpg", "jpeg", "png", "gif", "webp"];
    if (!allowedTypes.includes(extension.toLowerCase())) {
        return cb(HttpError(400, "Only image files are allowed"));
    }

    cb(null, true);
};

const uploadThumb = multer({
    storage,
    fileFilter,
});

export default uploadThumb;