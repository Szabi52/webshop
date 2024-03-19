import React, { useState, useEffect } from 'react';
import  http from '../../http-common';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const setAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    http.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete http.defaults.headers.common['x-access-token'];
  }
};

export default function UserProfil() {
  const [islogged, setIslogged] = useState(false);
  const [valasz, setValasz] = useState({});
  const [msg, setMsg] = useState('');


  // Adatlekérés a szerverről AXIOS!!
  useEffect(() => {
    //console.log('useEffect');
    setAuthHeader();
    http.get('/auth/userprofil')
      .then(response => {
        setIslogged(true);
        setValasz(response);
        setMsg('Azonosítás OK ');
        console.log(response);
      })
      .catch(error => {
        setValasz(error);
        if (error.response) {
          setMsg('Hiba: ' + error.response.status + ' ' + error.response.data.message);
        }
        else
          setMsg(error.message)
        console.log('ERROR', error);
      });


  }, []);
 
  return (
    <div>
      <h1>Felhasználói profil</h1>
      {!islogged ?
        (<>
          <h2>Nincs bejelentkezve</h2>
          <p>{JSON.stringify(valasz.data)}</p>
          <Link to="/login">
            <Button>Tovább a bejelentkezéshez</Button>
          </Link>
          {/* vagy direkt átirányítás: <Navigate to="/login" /> */}
        </>
        )
        : (
          <>
            <div>Bejelentkezve.</div>
            <p>{JSON.stringify(valasz.data)}</p>
            <h2>A felhasználó adatai</h2>
            {
              valasz.data.map(user => (
                <div>
                  <p>Id: {user.id}</p>
                  <p>Név: {user.username}</p>
                  <p>E-mail: {user.email}</p>
                  <p>Regisztráció: {user.createdate}</p>
                </div>
              ))
            }

          </>
        )
      }
    </div>

  )

}
