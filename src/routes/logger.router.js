import { Router } from "express";

const router = Router ()

router.get("/debug", (req,res) => {

    req.logger.debug({Method:req.method , URL:req.url, Message: "Logger debug"})

    res.send("Logger debug")

  })
  
router.get("/http", (req,res) => {

    req.logger.http({Method:req.method , URL:req.url, Message: "Logger http"})

    res.send("Logger http")


  })
  
router.get("/info", (req,res) => {

    req.logger.info({Method:req.method , URL:req.url, Message: "Logger info"})

    res.send("Logger info")

  })
  
  router.get("/warning", (req,res) => {

    req.logger.warning({Method:req.method , URL:req.url, Message: "Logger warning"})

    res.send("Logger warning")

  })
  
  router.get("/error", (req,res) => {

    try {

        throw new Error("Error in API");

      } catch (error) {

        req.logger.error({Method:req.method , URL:req.url, Message:`${error.message}`});

      } finally {

        res.send("Error :(");
      }

  })

  router.get("/fatal", (req,res) => {

    try {

        throw new Error("Fatal Error in API");

      } catch (error) {

        req.logger.fatal({Method:req.method , URL:req.url, Message:`${error.message}`});

      } finally {

        res.send("Fatal Error, RIP API :(");
      }

  })



export default router