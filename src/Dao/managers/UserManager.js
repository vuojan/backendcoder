import { logger } from "../../utils/loggerConfig.js";
import { UsersModels } from "../models/user.model.js";

export default class UsersMongoManager {
    constructor (){
        this.usersModel = UsersModels
    }

    getUsers = async () => {
        try {

            const users = await this.usersModel.find()

            return users
            
        } catch (error) {
        
            logger.error({Data: "file: UserManager.js:17 ~ UsersMongoManager ~ getUsers" ,Message:`${error.message}`})
            
        }
    }

    deleteUsers = async (inactivePeriod) => {
        try {

            const deletedUsers = await this.usersModel.deleteMany({lastActivity: { $lt: inactivePeriod }});
            
            return deletedUsers
 
        } catch (error) {

            logger.error({Data: "file: UserManager.js:27 ~ UsersMongoManager ~ deleteUsers" ,Message:`${error.message}`})
            
        }
    }

    deleteUser = async (userId) => {

        try {

            const deletedUser = await UsersModels.findByIdAndDelete(userId)
            
            return deletedUser

        } catch (error) {

            logger.error({Data: "file: UserManager.js:44 ~ UsersMongoManager ~ deleteUsers" ,Message:`${error.message}`})
            
        }
    }

    

}