import sequelize from "../sequelize.js";
import Users from "./Users.js";

/**
 * this table represents information about users who follow other users. 
 * userId: user who was being followed by other user (UserFollower)
 * followerId: user who fillows other user (FollowedUser)
 */
const UserFollower = sequelize.define('user_follower');

Users.belongsToMany(Users, {
    as: "FollowedUser",
    through: UserFollower,
    foreignKey: "followerId",
    otherKey: "userId"
})

// UserFollower.sync();

export default UserFollower;
