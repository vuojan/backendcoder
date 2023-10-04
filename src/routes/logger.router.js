import { Router } from "express";

const router = Router ()

router.get("/debug", (req,res) => {

    req.logger.debug({Data : req.logMessage, Message: "Logger debug"})

    res.send("Logger debug")

  })
  
router.get("/http", (req,res) => {

    req.logger.http({Data : req.logMessage, Message: "Logger http"})

    res.send("Logger http")


  })
  
router.get("/info", (req,res) => {

    //req.logger.info({Method:req.method , URL:req.url, Message: "Logger info"})

    req.logger.info( {Data : req.logMessage, Message: "Logger info"})

    res.send("Logger info")

  })
  
  router.get("/warning", (req,res) => {

    req.logger.warning({Data : req.logMessage, Message: "Logger warning"})

    res.send("Logger warning")

  })
  
  router.get("/error", (req,res) => {

    try {

        throw new Error("Error in API");

      } catch (error) {

        req.logger.error({Data : req.logMessage, Message:`${error.message}`});

      } finally {

        res.send("Error :(");
      }

  })

  router.get("/fatal", (req,res) => {

    try {

        throw new Error("Fatal Error in API");

      } catch (error) {

        req.logger.fatal({Data : req.logMessage, Message:`${error.message}`});

      } finally {

        res.send("Fatal Error, RIP API :(");
      }

  })



export default router