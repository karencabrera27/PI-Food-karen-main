import React from "react";
import cards from '../Cards/cards.module.css';



export default function Card({ name, diet, image}){
    return (
        <div className={cards.container}>
            <div className={cards.card}>
                <h1 className={cards.h1}>{name}</h1>
                <h5 className={cards.diet} >{diet}</h5>
                <img src={image} alt="img not found" className={cards.img}/>
            </div>
        </div>
    )
}

// width="200px" height="250px"