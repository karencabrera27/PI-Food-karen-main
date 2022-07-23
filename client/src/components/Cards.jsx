import React from "react";



export default function Card({ name, diet, image}){
    return (
        <div>
            <h1>{name}</h1>
            <h5>{diet}</h5>
            <img src={image} alt="img not found" width="200px" height="250px" />
        </div>
    )
}