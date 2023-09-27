import { HttpStatusCodes, errors } from "./errorHandler.middleware.js";

const httpStatus = new HttpStatusCodes

export const roleAuthorize = (role) => async(req,res,next) => {

      if ( !req.session?.user || !role.includes(req.session.user.role)) {

        return httpStatus.UNAUTHORIZED(res,`${errors.AUTH_ERROR}`)

      }

      next();
      
    };
  