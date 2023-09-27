import { StatusCodes } from "http-status-codes";

export const errors = {

    LOADING_ERROR: "RESOURCE/S COULD NOT BE LOADED",
    INVALID_RESOURCE: "RESOURCE/S NOT FOUND",
    BODY_FORMAT_ERROR: "ERROR IN BODY FORMAT REQUEST",
    CREATION_ERROR: "RESOURCE COULD NOT BE CREATED",
    UPDATE_ERROR: "UPDATE PROCESS FAILED",
    DELETION_ERROR: "FAILED TO PROCEED WITH THE DELETION",
    MOCKTEST_ERROR: "UNSUCCESFUL MOCKING",
    AUTH_ERROR: "WRONG CREDENTIALS",
    ADD_ERROR: "FAILED TO ADD PRODUCT TO CART"


}

export class HttpStatusCodes {

    OK (res,message,data){
        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            statusMessage: message,
            data
        })
    }

    CREATED (res,message,data){
        return res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            statusMessage: message,
            data
        })
    }

    BAD_REQUEST (res,message,data){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            statusMessage: message,
            data
        })
    }

    UNAUTHORIZED (res,message,data){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            statusMessage: message,
            data
        })
    }

    FORBIDDEN (res,message,data){
        return res.status(StatusCodes.FORBIDDEN).json({
            status: StatusCodes.FORBIDDEN,
            statusMessage: message,
            data
        })
    }

    NOT_FOUND (res,message,data){
        return res.status(StatusCodes.NOT_FOUND).json({
            status: StatusCodes.NOT_FOUND,
            statusMessage: message,
            data
        })
    }

    INTERNAL_SERVER_ERROR (res,message,data){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            statusMessage: message,
            data
        })
    }
    
}

 
