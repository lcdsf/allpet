const logAllPet = function(req, res, next){
    console.log(req.url);
    next();
};

module.exports = logAllPet;