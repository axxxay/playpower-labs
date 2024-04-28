const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeaders = request.headers['authorization'];
  if(authHeaders != undefined) {

    jwtToken = authHeaders.split(" ")[1];
  }
  if(jwtToken === undefined) {
    response.status(401);
    response.send({error: "Invalid JWT Token"});
  } else {
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, payload) => {
        if(error) {
            response.status(403);
            response.send({error: "Unauthorized request"});
        } else {
            request.username = payload.username;
            next();
        }
    });
  }
};
  
module.exports = authenticateToken;