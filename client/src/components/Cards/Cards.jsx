import React from "react";
import cards from '../Cards/cards.module.css';



export default function Card({ name, diets, image}){
    return (
        <div className={cards.container}>
            <div className={cards.card}>
                <h1 className={cards.h1}>{name}</h1>
                <div className={cards.contDiet}>{diets[0]?.name? diets.map((d, i) => <span className={cards.diet} key={i} > {d.name}</span>) : diets.map((d, i) => <span key={i} className={cards.diet}>{d+" "}</span>)}
                </div>
                <img src={image} alt={name} className={cards.img}/>
            </div>
        </div>
    )
}

// width="200px" height="250px"