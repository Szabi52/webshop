import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Fejlec from './component/Fejlec/Fejlec';
import Nyitolap from './component/Nyitolap/Nyitolap';
import Termekek from './component/Termekek/Termekek';
import Rolunk from './component/Rolunk/Rolunk';
import Elereseink from './component/Elereseink/Elereseink';
import Reszleteskereso from './component/ReszletesKereso/Reszleteskereso';
import Kosar from './component/Cart/Kosar';
import Bejelentkezes from './component/login/Bejelentkezes';
import Lablec from './component/Lablec/Lablec';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
 /*//betöltés localstorage-ból vagy vagy üres tömb
 const initCart = JSON.parse(localstorage.getItem('cart')) || [];
 const [cart, setCart] = useState(initCart); //kosár tárolása

 const [productAddedToCart, setProductAddedToCart] = useState(false);
 const [selectedProduct, setSelectedProduct] =useState('');
 const [quantities, setQuantities] =useState({});

 const IMG_URL='';

 //Mentés a localstorage-ba
 useEffect(()=>{
  localStorage.setItem('cart', JSON.stringify(cart));
 }, [cart]);

 //A kosár elemei: {product:termek, quantity:mennyiseg}
 const addToCartFunction=(termek)=>{
  const mennyiseg=quantities[termek.id] || 1;
  const vanIlyen=cart.find(item=>item.product.id===termek.id);

  if(vanIlyen{
    const ujKosar=cart.map(item =>
      item.product.id === termek.id ? {
        ...item, quantity: 1*item.quantity + mennyiseg
      }
      : item
      )
      setCart(ujKosar); 
    }
    )
 }*/

  return (
    <div>
    <Router>
        <Fejlec />
        <main>
          <Routes>
            <Route path="/" element={<Nyitolap />} />
            <Route path="/termekek" element={<Termekek />} />
            <Route path="/rolunk" element={<Rolunk />} />
            <Route path="/elereseink" element={<Elereseink />} />
            <Route path="/reszleteskereso" element={<Reszleteskereso />} />
            <Route path="/kosar" element={<Kosar />} />
            <Route path="/bejelentkezes" element={<Bejelentkezes />} />
          </Routes>
        </main>
    </Router>
        <Lablec />
    </div>
  );
}
 export default App;

