const jwt = require("jsonwebtoken");
const config = require('../db/authconfig');
  /* HTTP status codes:
     401 Unauthorized - akkor használható, ha hitelesítésre van szükség, és az sikertelen vagy még nem történt meg
     403 Forbidden - Tiltott, a felhasználó nem rendelkezik a szükséges engedélyekkel egy erőforráshoz
  */
verifyAdmin = (req,res,next) => {
  let token = req.headers["x-access-token"];

  if(!token) {
      return res.status(401).send({message: "Nincs token megadva!"} )
  }
  else
  {
    jwt.verify(token, config.secret, (err,decoded)=>{
      if(err){
        return res.status(401).send({message:"Érvénytelen token."})  
      }
      req.userParams = decoded;  // A tokenben lévő packet.
                                 //{"email": "admin@admin.hu","role": 9,"iat": 1704881136,"exp": 1704882936}
    });

    if(req.userParams.role == 9 )  // admin: role = 9
      next();  
    else
    return res.status(403).send({message: "Nincs hozzá jogosultsága!"})
  }
}
     
verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(401).send({message: "Nincs token megadva!"} )
    }
    else
    {
      jwt.verify(token, config.secret, (err,decoded)=>{
        if(err){
          return res.status(401).send({message:"Érvénytelen token."})  
        }
        req.userParams = decoded;  // A tokenben lévő packet.
                                   //{"email": "admin@admin.hu","role": 9,"iat": 1704881136,"exp": 1704882936}
            console.log('Kiadva  : '+ new Date(1000*req.userParams.iat).toLocaleString());
            console.log('Érvényes: '+ new Date(1000*req.userParams.exp).toLocaleString());

        req.userParams["expDate"] = new Date(1000*req.userParams.exp).toLocaleString();
      });
      next();  
    }
}

const authJwt = {
    verifyToken : verifyToken,
    verifyAdmin : verifyAdmin  
}

module.exports = authJwt;

