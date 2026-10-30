const logger = (req, res, next) => {
    console.log("Método: ", req.method);
    console.log("URL: ", req.url);
    
    next();

}

module.exports = logger