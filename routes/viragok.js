var express = require('express');
var router = express.Router();
var Db = require('../db/dboperations');

//Összes adat. (GET http://localhost/viragok)
router.get('/', (req,res) => {
    Db.selectViragok()
    .then((adat) => {
        res.json(adat);
    })
    .catch(
        (error) => {res.send (error)}
    )
});

//2. szűrt termék lekérése
router.get('/filter/:szur',(req, res)=>{
    let szur='%'+req.params.szur+'%';
    Db.selectFilteredViragok(szur)
        .then(
        
            adat=>{
                if(adat.length===0){
                    res.error(404).send("Nincs ilyen virág!");
                }
                else{
                    res.json(adat)
                }
            }
        )
        .catch(error=>{console.log("ERROR"); res.send(error)});
})

router.get('/page/:pageNo' ,(req, res)=>{
    let oldal=Number(req.params.pageNo);
    Db.selectViragok(oldal)
    .then(adat=>res.json(adat))
    .catch(error=>res.send(error));
});



router.get('/kereses/:szo', (req, res) => {
    const searchTerm = '%' + req.params.szo + '%';
   
    if (!searchTerm) {
      return res.status(400).json({ error: 'Hiányzó keresési kifejezés' });
    }
   
    db.searchKonyv(searchTerm)
      .then(
        adat => res.json(adat)
      )
      .catch(
        error => res.send(error)
      );
  });

module.exports = router;