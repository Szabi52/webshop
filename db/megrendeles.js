application.post('/megrendelesek', async(req, res)=>{
    const{nev, datum, tetelek} =req.body;

    try{
        await createPool.query('START TRANSICTION');
        
        //INSERT megrendelés
        const [megrendelesResult] = await createPool.query('INSERT INTO megrendeles(user_id, datum) VALUES (?,?)', [user_id, datum]);
        const megrendelesId=megrendelesResult.insertId;

        //INSERT TÉTELEK
        const insrtTetelekQuery='INSERT INTO rendeles_tetel (megrendeles_id, termek_nev, mennyiseg, ar) VALUES (?,?,?,?)';

        //Több tétel beszúrása egy SQL-lel
        const tetelekValues = tetelek.map(tetel=>[megrendelesId, tetel.termek_nev, tetel.mennyiseg, tetel.ar]);
        await createPool.query(insrtTetelekQuery, [tetelekValues]);

        await createPool.query('COMMIT');

        res.status(200).json({success: true, message: 'Megrendelés sikeresen hozzáadva'});
    } catch(error){
        console.error('Hiba a megrendelés hozzáadása közben: ', error);
        res.status(500).json({error: 'Hiba a megrendelés hozzáadása jözben'});  
    }
    });