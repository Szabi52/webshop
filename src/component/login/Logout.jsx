import React from "react";

export default function Logout(){
    return(
        <div>
            {localStorage.removeItem('token')}
            <h2>Sikeres kijelentkezás.</h2>
        </div>
    )
}