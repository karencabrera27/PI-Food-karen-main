import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getDetail from '../../actions';
import d from '../Detail/detail.module.css'

export default function DetailRecipe(props){
    console.log(props)
    const dispatch = useDispatch();
    

    useEffect(()=>{
        // accedo al id de ese detalle
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myRecipe = useSelector((state) => state.detail)
    console.log(myRecipe)

    return(
        <React.Fragment>
        <div className={d.container}>
            {
                myRecipe.length > 0 ?
                <div className={d.card}>
                    
                    <h1>{myRecipe[0].name}</h1>
                    <h4>Nivel de salud: {myRecipe[0].healthLevel}</h4>
                    <h4> Resumen {myRecipe[0].resume}</h4>
                    <h4>Pasos {myRecipe[0].steps}</h4>
                    <h4>Dietas: {!myRecipe[0].createdInDb ? myRecipe[0].diet + ' ' : myRecipe[0].diets.map(e=>e.name + (' '))} </h4>
                    <img src={myRecipe[0].img ? myRecipe[0].img : myRecipe[0].image}/>
                </div> : 
                <div class="spinner">
                    <div class="loader l1"></div>
                    <div class="loader l2"></div>
                </div>

            }

            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
        </React.Fragment>
    )
}