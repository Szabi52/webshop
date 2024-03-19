var config = require('./dbconfig');
const mysql = require('mysql');

let pool = mysql.createPool(config);

async function addUser(data){
    return new Promise((resolve, reject) =>{
        pool.query('insert into kezelok (nev, login, email, jelszo, cim, telefonszam) values (?,?,?, SHA2(?, 256),?, ?)',
                    [data.nev, data.login, data.email, data.jelszo, data.cim, data.telefonszam], (error, elements)=>{
            if(error){
                return reject(error)
            }
            return resolve(elements);
        });
    });
}

//Összes adat. (GET http://localhost/jatekok)
async function selectViragok() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM szovegestabla', (error, elements) => {
            if (error) {
                return reject(error);
            }
            resolve(elements);
        });
    });
};
/*
SELECT * FROM osszesadat 
WHERE magyarnev LIKE '%rózsa%'
AND ar>=1000
AND ar<=10000
*/

async function selectViragokWhere(whereConditions){
    return new Promise((resolve, reject)=>{
        let whereClause= "";
        let values=[];

        if(whereConditions.magyarnev){
            if (whereClause.length===0){whereClause+= "WHERE " }
            else { whereClause += " AND "}
            whereClause+= 'magyarnev like ?';
            values.push('%'+whereClause.magyarnev+'%')
        }
        
        if(whereConditions.minar){
            if (whereClause.length===0){whereClause+= "WHERE " }
            else { whereClause += " AND "}
            whereClause+= 'minar >= ?';
            values.push('%'+whereClause.minar+'%')
        }

        if(whereConditions.maxar){
            if (whereClause.length===0){whereClause+= "WHERE " }
            else { whereClause += " AND "}                
            whereClause+= 'minar <= ?';
            values.push('%'+whereClause.maxar+'%')
        }

        const query = 'SELECT * FROM szovegestabla ${whereClause} ORDER BY id';
        console.log(query);

        pool.query(query, values, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        })
    })
}



async function selectFilteredViragok(szur) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM szovegestabla where magyarnev like ?',[szur], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

async function selectViragokPerPage(pageNo){
    return new Promise((resolve, reject)=>{
        pool.query('select * from szovegestabla order by id limit ?, 10' [(pageNo-1)*10], (err, elements)=>{
            if(error){
                return reject(error)
            }
            return resolve(elements);
        });
    });
}

async function searchViragok(searchTerm) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM szovegestabla WHERE magyarnev LIKE ? OR latinnev LIKE ?', [`%${searchTerm}%`, `%${searchTerm}%`], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

async function login(email,jelszo) {
    return new Promise((resolve, reject) => {
        //SELECT * from kezelok where email='admin@gmail.com' and jelszo=SHA2('admin',256)
        pool.query('SELECT * from kezelok where email=? and jelszo=SHA2(?,256)', [email,jelszo], (error, elements) => {
            if (error) {
                return reject(error);
            }
            resolve(elements);
        });
    });
};

async function getUserprofil(email){
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM kezelok WHERE email=?', [email], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

module.exports = {
    addUser,
    selectViragok,
    selectViragokWhere,
    selectFilteredViragok,
    selectViragokPerPage,
    searchViragok,
    login,
    getUserprofil
}