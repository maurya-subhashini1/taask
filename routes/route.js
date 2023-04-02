const express=require("express")
const {datagetcontrise,getRankOfContrise} = require("../controller/app")

const router=express.Router()


router.get("/dataofcontrise",datagetcontrise)
router.get("/getData",getRankOfContrise)

module.exports=router