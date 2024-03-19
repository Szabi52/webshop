var express = require('express');
var router = express.Router();
var Db = require('../db/dboperations');
const config = require('../db/authconfig');
var jwt = require('jsonwebtoken');
const authJwt = require('../middleware/authJwt');

router.post('/login', function(req, res) {
    Db.login(req.body.email, req.body.jelszo)
    .then(data => data[0])
    .then(data => {
        const packet = {"email":data.email, "role": data.role};
        const token = jwt.sign(packet,config.secret,{expiresIn:'1800s'})
        res.status(200).json(
            {
            "data":data,
            "token":token
            }
        )
    })
    .catch(error => res.status(404).send(error));
});

router.get('/userprofil', [authJwt.verifyToken],
    (req, res) =>{
        
        Db.getUserprofil(req.userParams.email)
            .then(adat=> res.json(adat))
            .catch(error => res.send(error));
    }
);

/*router.get('/register', async (req, res) =>{
        try{
            const{email, login, jelszo}=req.body;
            //Email ellenőrzés
            const existingUser=await Db.selectUserByEmail(email);
            if(existingUser.length>0){
                return res.status(400),json({error:'Ez az email cím már regisztrálva van'});
            }
            //Ha az email nem foglalt, megtörténik a regisztráció
            const newUser=await Db.registerUser(email, login, jelszo);

            res.status(201).json({message})
        }
    });*/
module.exports = router;