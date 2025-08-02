const express = require("express");
const router = express.Router();
const {  handleRedirectUrl} = require('../controllers/url');
const URL = require('../models/url');


router.get('/',(request,response)=>{
   return  response.render('home' );
})

router.get("/:shortId", handleRedirectUrl);

module.exports = router;
