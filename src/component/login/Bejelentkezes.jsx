import React, { useState} from "react";
import './Bejelentkezes.css';
import http from '../../http-common';

export default function Login({setIslogged}) {

    const [email, setEmail] = useState('');
    const [password, setPassword]=useState('');
    const [error, setError]=useState('');
    const [userData, setUserData]= useState('');


  const handleLoging=()=>{
    http.post('/auth/login', {email, password})
    .then(response=>{
      if(response.status ===200){
        console.log(response);
        setUserData(response.data.data);
        const token=response.data.token;
        setIslogged(true);
        setError('');
        localStorage.setItem('token', token);
      } else{
        setError('Hibás bejelentkezés');
      }
    })
    .catch(error=>{
      setIslogged(false);
      setError('Hibás felhasználónév vagy jelszó');
      console.log(error);
    });
  }

  return (
    <div className="bejelentkezesdiv">
      <h2 className="kozep">Bejelentkezés</h2>
      <div className="datadiv">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password">Jelszó</label>
        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" onClick={handleLoging}>Bejelentkezés</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
