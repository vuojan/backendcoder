import UsersMongoManager from "../Dao/managers/UserManager.js";
import { HttpStatusCodes, errors } from "../middleware/errorHandler.middleware.js";
import UserDto from "../dto/currentuser.dto.js";
import { UsersModels } from "../Dao/models/user.model.js";

const usersMongoManager = new UsersMongoManager ()
const httpStatus = new HttpStatusCodes ()

export const getUsers = async (req,res) =>{

    try {

        const users = await usersMongoManager.getUsers()

        if (!users) return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)
    
        const filteredUsers = users.map(user => {
            return {
                name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
            };
        });
    
        return httpStatus.OK(res, "Users loaded", filteredUsers)
        
    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})
        
        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.LOADING_ERROR}`, error)
        
    }

}

export const deleteUsers = async (req,res) =>{

    try {

        const inactivePeriod = new Date ()
        inactivePeriod.setDate(inactivePeriod.getDate() - 2);

        req.logger.info({Data: inactivePeriod})

        const deletedUsers = await usersMongoManager.deleteUsers(inactivePeriod)

        if (deletedUsers.deletedCount === 0) {

            req.logger.info({Message:"There are no inactive users to delete"})

            return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)

        } 

        return httpStatus.OK(res, "Users deleted", carts)
        
    } catch (error) {
    
        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.LOADING_ERROR}`, error)
        
    }

}

export const updateRole = async (req,res) =>{

    try {
        
        const { userId } = req.params;

        const user = await UsersModels.findById(userId);

        if (!user) {
            return httpStatus.NOT_FOUND(res,`${errors.INVALID_RESOURCE}`)
        }

        user.role = user.role === 'usuario' ? 'admin' : 'usuario';

        await user.save();

        return httpStatus.OK(res, "Role updated", user)


    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.LOADING_ERROR}`, error)

    }


}

export const deleteUser = async (req,res)=> {

    try {

        const { userId } = req.params;

        const deletedUser = await usersMongoManager.deleteUser(userId)

        return httpStatus.OK(res, "User deleted", deletedUser)
        
    } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`})

        return httpStatus.INTERNAL_SERVER_ERROR(res, `${errors.LOADING_ERROR}`, error)
        
    }
   

}