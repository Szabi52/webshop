import React, {useState, useEffect} from "react";
import axios from "axios";
import './Nyitolap.css';

export default function Nyitolap(){
    const [items, setItems]=useState([]);

useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/viragok');
        console.log(data);
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
    }, []);
    return (
        <div>
            <h1>Üdvözlünk a Kis-Zuzmó BÓT-ban!</h1>
        </div>

      );

}