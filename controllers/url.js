const {nanoid} = require('nanoid');
const URL = require('../models/url')

async function handleGenerateNewShortURL(request,response){
     const allUrls = await URL.find({});
    const body = request.body;
    if(!body.url) return response.status(400).json({error:"Url is required"});
    const shortID = nanoid(8);
    await URL.create({
        shortID : shortID,
        redirectUrl:body.url,
        visitHistory:[],
    });

    return  response.json({id:shortID});
    // return response.json({id:shortID});
}

async function handleRedirectUrl(request,response){
    const shortId = request.params.shortId;
   const entry =  await URL.findOneAndUpdate({
        shortID:shortId,
    },{$push:{
        visitHistory :{ 
            timeStamp: Date.now(),
        } ,
    }});

    if(!entry){
       return  response.status(404).json({error:"URL not found"})
    }

    return response.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(request,response){
    const shortId = request.params.shortId;
    const result = await URL.findOne({shortID:id});
   return response.json({
    totalClicks:result.visitHistory.length,
    analytics : result.visitHistory
});
}


module.exports ={
    handleGenerateNewShortURL,
    handleRedirectUrl,
    handleGetAnalytics
}